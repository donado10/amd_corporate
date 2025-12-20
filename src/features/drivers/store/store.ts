import { create } from "zustand";

interface ICartContent {
	items: IDocument[];
}
interface ICartAction {
	initItems: (items: IDocument[]) => void;
	setItem: (item: IDocument) => void;
	removeItem: (ref: string) => void;
	cleanCart: () => void;
}

interface IFeatState extends ICartContent, ICartAction {
	status: number;
}

export const useCartStore = create<IFeatState>()((set) => ({
	items: [],
	status: 0,
	initItems: (itemsDoc: IDocument[]) =>
		set((state) => {
			state.cleanCart();
			state.status = 1;
			return { items: [...itemsDoc] };
		}),
	setItem: (item: IDocument) =>
		set((state) => {
			if (
				state.items.length > 0 &&
				state.items.find((it) => it.entete.piece === item.entete.piece)
			) {
				return { items: [...state.items] };
			}

			state.status = 1;

			return { items: [item, ...state.items] };
		}),
	removeItem: (ref: string) =>
		set((state) => {
			if (state.items.length === 1) {
				state.status = 0;
			}
			return {
				items: state.items.filter((it) => it.entete.piece != ref),
			};
		}),
	cleanCart: () => {
		return set((state) => {
			state.status = 0;
			return { items: [] };
		});
	},
}));
