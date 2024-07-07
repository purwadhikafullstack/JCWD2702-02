export interface IAdminCategoryCard {
    category: {
        id: number;
        name: string;
        categoryUrl: string;
    };
    isUpdating: any;
    onFormClose: () => void;
    onUpdate: () => void;
}

export interface IAdminProductCard {
    id: number;
    name: string;
    price: number;
    productImage: string;
}

export interface ICreateCategoryFormProps {
    onClose: () => void;
}

export interface IUpdateCategoryFormProps {
    category: any;
    onClose: () => void;
}

export interface IAdminWarehouseCard {
    id: number;
    name: string;
    province: string;
    city: string;
}

export interface ICreateRequestModalProps {
    closeManualRequestModal: () => void;
    selectedProduct: any;
    dataWarehouseDetail: any;
    dataStockMutationTypeLists: any[];
}

export interface IAddStockModalProps {
    closeAddStockModal: () => void;
    selectedProduct: any;
    dataWarehouseDetail: any;
    warehouseId: string;
}

export interface IReduceStockModalProps {
    closeReduceStockModal: () => void;
    selectedProduct: any;
    dataWarehouseDetail: any;
    warehouseId: string;
}

export interface IDeletePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
}