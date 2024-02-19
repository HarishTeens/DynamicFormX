import Accordion from "../../atoms/Accordion";
import TableFieldsRenderer, { ITableFieldsProps } from "./components/TableFieldsRenderer";
import InputFieldsRenderer, {
  IInputFieldsRendererProps,
} from "./components/InputFieldsRender";
import { IFormCategoryData } from "./types/IFormCategoryData";
import { categorizeForms } from "./utils/categorizeForms";
import { ITableMapState } from "./types/IUseTableFields";


export interface IInputFieldsProps extends IInputFieldsRendererProps {
  formCategoryData?: IFormCategoryData | undefined;
  isFormSubmitted?:boolean;
}

const InputFields: React.FC<IInputFieldsProps | ITableFieldsProps> = (props) => {
  if(props?.settings?.financialSpreading){
    const { values, isFormSubmitted, ...rest } = props as ITableFieldsProps;
    return <TableFieldsRenderer isFormSubmitted={isFormSubmitted} values={values as ITableMapState} {...rest} />
  }
  
  const { values, formCategoryData, isFormSubmitted, ...rest } = props as IInputFieldsProps;
  return Object.values(categorizeForms(values, formCategoryData)).sort((catA, catB) =>{
    return catA.priority - catB.priority;
    }).map(
    ({ title, formFieldData }) =>
      title && Object.keys(formFieldData).length ? (
        <Accordion
          items={[
            {
              title,
              content: <InputFieldsRenderer isFormSubmitted={isFormSubmitted} values={formFieldData} formCategoryData={formCategoryData} 
               {...rest} />,
            },
          ]}
        />
      ) : (
        <>
          <InputFieldsRenderer isFormSubmitted={isFormSubmitted} values={formFieldData} formCategoryData={formCategoryData}
           {...rest} />
        </>
      )
  );
};

export default InputFields;
