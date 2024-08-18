// types/exif-js.d.ts
declare module "exif-js" {
  interface EXIFStatic {
    getData(img: any, callback: () => void): void;
    getAllTags(img: any): { [key: string]: any };
    getTag(img: any, tag: string): any;
  }

  const EXIF: EXIFStatic;
  export default EXIF;
}
