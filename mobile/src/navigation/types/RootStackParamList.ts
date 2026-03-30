import { Product } from "../../features/products/types";

export type RootStackParamList = {
    SignIn: undefined;
    MainTabs: undefined;
    ProductDetails: {
        product?: Product;
    } | undefined;
    Profile?: undefined;
};
