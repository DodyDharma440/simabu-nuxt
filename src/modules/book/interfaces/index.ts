import type { BasicData } from "~/common/interfaces/data";

export interface IBookCategory extends BasicData {
  nama: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IBookCategoryInput extends Pick<IBookCategory, "nama"> {}

export interface IBook extends BasicData {
  judul: string;
  kodeBuku: string;
  imageUrl: string | null;
  penerbit: string;
  tahunTerbit: number;
  jumlahHalaman: number;
  penulis: string | null;
  nomorRak: number;
  stok: number;
  kategoriId: number;
  kategori?: IBookCategory;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IBookInput extends Omit<IBook, keyof BasicData | "kategori"> {}

export interface IBookInputUi extends IBookInput {
  tahunTerbitDate: Date | null;
  imageFile: File | null;
}
