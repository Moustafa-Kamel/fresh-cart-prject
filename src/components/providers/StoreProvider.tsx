"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { getStoreStateAction, mutateStoreAction } from "@/actions/store";

type StoreState = Extract<
  Awaited<ReturnType<typeof getStoreStateAction>>,
  { ok: true }
>;
type Product = StoreState["wishlist"][number]["product"];
type Mutation =
  | "cart-add"
  | "cart-set"
  | "cart-remove"
  | "cart-clear"
  | "wishlist-add"
  | "wishlist-remove";
type StoreValue = {
  cart: StoreState["cart"];
  wishlist: StoreState["wishlist"];
  total: number;
  cartCount: number;
  setCartCount: (count: number) => void;
  wishlistCount: number;
  ready: boolean;
  busy: boolean;
  isGuest: boolean;
  error: string | null;
  retry: () => Promise<void>;
  addToCart: (product: Pick<Product, "id">) => Promise<void>;
  toggleWishlist: (product: Pick<Product, "id">) => Promise<void>;
  setQuantity: (id: string, count: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

export const StoreContext = createContext<StoreValue | null>(null);

export default function StoreProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const owner = status === "authenticated" ? session.user?.email : null;
  const currentOwner = useRef(owner);
  currentOwner.current = owner;
  const pending = useRef(false);
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

  useEffect(() => {
    let cancelled = false;
    setState(null);
    setCartCount(0);
    setLoadedOwner(null);
    setError(null);
    if (owner) {
      getStoreStateAction(owner).then((result) => {
        if (cancelled) return;
        setLoadedOwner(owner);
        if (result.ok) {
          setState(result);
          setCartCount(result.cart.reduce((sum, item) => sum + item.count, 0));
        } else setError(result.message);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [owner]);

  async function mutate(kind: Mutation, productId?: string, count?: number) {
    if (!owner) {
      toast.error("Please sign in to update your cart or wishlist.");
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
      } else await load();
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  const accountState = owner === loadedOwner ? state : null;
  return (
    <StoreContext
      value={{
        cart: accountState?.cart ?? [],
        wishlist: accountState?.wishlist ?? [],
        total: accountState?.total ?? 0,
        cartCount: accountState ? cartCount : 0,
        setCartCount,
        wishlistCount: accountState?.wishlist.length ?? 0,
        ready: status !== "loading" && (!owner || owner === loadedOwner),
        busy,
        isGuest: status !== "authenticated",
        error,
        retry: load,
        addToCart: (product) => mutate("cart-add", product.id),
        toggleWishlist: (product) =>
          mutate(
            accountState?.wishlist.some((item) => item.productId === product.id)
              ? "wishlist-remove"
              : "wishlist-add",
            product.id,
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
