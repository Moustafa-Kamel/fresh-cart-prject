"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { getStoreStateAction, mutateStoreAction } from "@/actions/store";

import {
  type GuestCartItem,
  type GuestProduct,
  type GuestWishlistItem,
  readGuestCart,
  readGuestWishlist,
  writeGuestCart,
  writeGuestWishlist,
} from "@/lib/guestStorage";

type StoreState = Extract<
  Awaited<ReturnType<typeof getStoreStateAction>>,
  { ok: true }
>;

type Product = GuestProduct;
type Mutation =
  | "cart-add"
  | "cart-set"
  | "cart-remove"
  | "cart-clear"
  | "wishlist-add"
  | "wishlist-remove";
type StoreValue = {
  cart: StoreState["cart"];
  wishlist: GuestWishlistItem[];
  total: number;
  cartCount: number;
  setCartCount: (count: number) => void;
  wishlistCount: number;
  ready: boolean;
  busy: boolean;
  isGuest: boolean;
  error: string | null;
  retry: () => Promise<void>;
  addToCart: (product: Product) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  setQuantity: (id: string, count: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const messages: Record<Mutation, string> = {
  "cart-add": "Added to cart.",
  "cart-set": "Quantity updated.",
  "cart-remove": "Removed from cart.",
  "cart-clear": "Cart cleared.",
  "wishlist-add": "Added to wishlist.",
  "wishlist-remove": "Removed from wishlist.",
};

export const StoreContext = createContext<StoreValue | null>(null);

export default function StoreProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const owner = status === "authenticated" ? session.user?.email : null;
  const currentOwner = useRef(owner);
  currentOwner.current = owner;
  const pending = useRef(false);
  const [guestCart, setGuestCart] = useState<GuestCartItem[]>([]);
  const [guestWishlist, setGuestWishlist] = useState<GuestWishlistItem[]>([]);
  const [guestReady, setGuestReady] = useState(false);
  const merged = useRef(false);
  useEffect(() => {
    setGuestCart(readGuestCart());
    setGuestWishlist(readGuestWishlist());
    setGuestReady(true);
  }, []);
  const [state, setState] = useState<StoreState | null>(null);
  const [loadedOwner, setLoadedOwner] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!owner) return;
    const result = await getStoreStateAction(owner);
    if (currentOwner.current !== owner) return;
    setLoadedOwner(owner);
    if (result.ok) {
      setState(result);
      setCartCount(result.cart.reduce((sum, item) => sum + item.count, 0));
      setError(null);
    } else setError(result.message);
  }

  const merge = useEffectEvent(async (saved: StoreState | null) => {
    if (merged.current || (!guestCart.length && !guestWishlist.length)) return;
    merged.current = true;
    if (!saved) {
      toast.warning(
        "Some saved items could not be added and stayed on this device.",
      );
      return;
    }
    async function send(kind: Mutation, productId: string, count?: number) {
      if (currentOwner.current !== owner) return false;
      try {
        return (await mutateStoreAction({ owner, kind, productId, count })).ok;
      } catch {
        return false;
      }
    }
    let cart = guestCart;
    let wishlist = guestWishlist;
    for (const item of guestCart) {
      const exists = saved.cart.some(
        (entry) => entry.productId === item.productId,
      );
      const ok =
        exists ||
        ((await send("cart-add", item.productId)) &&
          (item.count === 1 ||
            (await send("cart-set", item.productId, item.count))));
      if (ok) {
        cart = cart.filter((entry) => entry.productId !== item.productId);
        writeGuestCart(cart);
      }
    }
    for (const item of guestWishlist) {
      const ok =
        saved.wishlist.some((entry) => entry.productId === item.productId) ||
        (await send("wishlist-add", item.productId));
      if (ok) {
        wishlist = wishlist.filter(
          (entry) => entry.productId !== item.productId,
        );
        writeGuestWishlist(wishlist);
      }
    }
    setGuestCart(cart);
    setGuestWishlist(wishlist);
    await load();
    if (currentOwner.current !== owner) return;
    if (cart.length || wishlist.length)
      toast.warning(
        "Some saved items could not be added and stayed on this device.",
      );
    else
      toast.success("Your saved cart and wishlist were added to your account");
  });

  useEffect(() => {
    if (!guestReady || status === "loading") return;
    setState(null);
    setBusy(false);
    setCartCount(0);
    setLoadedOwner(null);
    setError(null);
    if (!owner) {
      merged.current = false;
      return;
    }
    setBusy(true);
    getStoreStateAction(owner)
      .then(async (result) => {
        if (currentOwner.current !== owner) return;
        setLoadedOwner(owner);
        if (result.ok) {
          setState(result);
          setCartCount(result.cart.reduce((sum, item) => sum + item.count, 0));
          await merge(result);
        } else {
          setError(result.message);
          await merge(null);
        }
      })
      .catch(() => {
        if (currentOwner.current === owner)
          setError("Unable to load your saved items. Please try again.");
      })
      .finally(() => {
        if (currentOwner.current === owner) setBusy(false);
      });
  }, [owner, guestReady, status]);

  async function mutate(
    kind: Mutation,
    productId?: string,
    count?: number,
    product?: Product,
  ) {
    if (!owner) {
      if (!guestReady) return;
      let cart = guestCart;
      let wishlist = guestWishlist;
      if (kind === "cart-add" && product) {
        const exists = cart.some((item) => item.productId === productId);
        cart = exists
          ? cart.map((item) =>
              item.productId === productId
                ? { ...item, count: Math.min(999, item.count + 1) }
                : item,
            )
          : [...cart, { productId: product.id, count: 1, product }];
      }
      if (
        kind === "cart-set" &&
        count &&
        Number.isInteger(count) &&
        count > 0 &&
        count <= 999
      )
        cart = cart.map((item) =>
          item.productId === productId ? { ...item, count } : item,
        );
      if (kind === "cart-remove")
        cart = cart.filter((item) => item.productId !== productId);
      if (kind === "cart-clear") cart = [];
      if (
        kind === "wishlist-add" &&
        product &&
        !wishlist.some((item) => item.productId === productId)
      )
        wishlist = [...wishlist, { productId: product.id, product }];
      if (kind === "wishlist-remove")
        wishlist = wishlist.filter((item) => item.productId !== productId);
      if (kind.startsWith("cart")) {
        setGuestCart(cart);
        writeGuestCart(cart);
      } else {
        setGuestWishlist(wishlist);
        writeGuestWishlist(wishlist);
      }
      toast.success(messages[kind]);
      return;
    }
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    try {
      const result = await mutateStoreAction({ owner, kind, productId, count });
      if (currentOwner.current !== owner) return;
      if (!result.ok) {
        setError(result.message);
        toast.error(result.message);
      } else {
        await load();
        toast.success(messages[kind]);
      }
    } catch {
      toast.error("Unable to update your saved items. Please try again.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  const accountState = owner === loadedOwner ? state : null;
  const cart = owner ? (accountState?.cart ?? []) : guestCart;
  const wishlist = owner ? (accountState?.wishlist ?? []) : guestWishlist;
  return (
    <StoreContext
      value={{
        cart,
        wishlist,
        total: owner
          ? (accountState?.total ?? 0)
          : guestCart.reduce(
              (sum, item) => sum + item.count * item.product.price,
              0,
            ),
        cartCount: owner
          ? accountState
            ? cartCount
            : 0
          : guestCart.reduce((sum, item) => sum + item.count, 0),
        setCartCount,
        wishlistCount: wishlist.length,
        ready:
          guestReady &&
          status !== "loading" &&
          (!owner || owner === loadedOwner),
        busy,
        isGuest: status !== "authenticated",
        error,
        retry: load,
        addToCart: (product) =>
          mutate("cart-add", product.id, undefined, product),
        toggleWishlist: (product) =>
          mutate(
            wishlist.some((item) => item.productId === product.id)
              ? "wishlist-remove"
              : "wishlist-add",
            product.id,
            undefined,
            product,
          ),
        setQuantity: (id, count) => mutate("cart-set", id, count),
        removeFromCart: (id) => mutate("cart-remove", id),
        clearCart: () => mutate("cart-clear"),
      }}
    >
      {children}
    </StoreContext>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
