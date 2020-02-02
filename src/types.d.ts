export type Item = {
  name: string;
  link: string?;
};

export type ItemDoc = {
  items: Item[];
  id: int;
};

export interface UpdateItemParams {
  index: number;
  value: string;
}

export interface ListItemProps {
  item: Item;
  cancel: () => void;
  store: (data: UpdateItemParams) => void;
  index: number;
}