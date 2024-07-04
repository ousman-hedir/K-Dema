

export interface SelectingInputsProps {
    id: string;
    title?: string;
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
  }



export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    brand: string;
    color: string;
    category: string; 
}
