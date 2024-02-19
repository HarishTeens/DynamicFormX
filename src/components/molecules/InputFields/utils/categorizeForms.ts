import { ICategory, IFormCategoryData } from "../types/IFormCategoryData";
import {
  IInputFieldsState,
  IInputFieldState,
} from "../types/IInputFieldsState";

export const categorizeForms = (
  values: IInputFieldsState,
  formCategoryData?: IFormCategoryData
): Record<string, ICategory> => {
  /**
   * Every form will have 1 category called uncategorized
   * that will have no accordion
   */
  const categories: Record<string, ICategory> = {
    uncategorized: {
      title: "",
      formFieldData: {},
      priority: 0,
    },
  };

  /**
   * All tags need to be at the bottom
   * Adds tags at the end
   */
  const tagCategories: ICategory = {
    title: "",
    formFieldData: {},
    priority: Infinity,
  };

  /**
   * Adds categories as per the form category data
   */
  formCategoryData?.options.forEach(({ key, value }, idx: number) => {
    if (!categories[key]) {
      categories[key] = {
        title: value,
        formFieldData: {},
        priority: idx
      };
    }
  });

  // console.log("options", JSON.stringify(Object.keys(categories), null, 2))
  Object.keys(values).forEach((key) => {
    if (["tags"].includes((values[key as keyof IInputFieldsState] as IInputFieldState).type)) {
      tagCategories.formFieldData[key as keyof IInputFieldsState] = values[key as keyof IInputFieldsState];
    } else {
      const formCategory =
        (values[key as keyof IInputFieldsState] as IInputFieldState).formCategory || "uncategorized";

      /**
       * There can be a case where a form category is
       * present with an input but not in the form category data
       *
       * In such cases add a new category
       * to the categories object
       */
      if (!categories[formCategory]) {
        categories[formCategory] = {
          title: formCategory,
          formFieldData: {},
          priority: 0,
        };
      }

      /**
       * Add the input field state
       * under the corresponding category
       */
      categories[formCategory].formFieldData[key as keyof IInputFieldsState] = values[key as keyof IInputFieldsState];
    }
  });

  categories.tags = tagCategories;
  // console.log("categories", JSON.stringify(categories, null, 2));

  return categories;
};
