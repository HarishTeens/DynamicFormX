
interface ITableOptionsProps {
    options?: string[];
    selectedOption?: string;
    onOptionClick: (option: string) => void;
}

const TableOptions = (props: ITableOptionsProps) => {

    if(!props.options || props.options.length === 0) return <></>
    
    return (
        <div className="w-full border-b-[1px] flex ">
            {props.options.map((item) => {
                return (
                    <div
                        key={item}
                        onClick={() => {
                            props.onOptionClick(item)
                        }}
                        className={`w-[15%]  ${
                            props.selectedOption == item
                            ? "border-b-primary border-b-[4px]"
                            : "border-b-[1px]"
                        } py-2 cursor-pointer`}
                    >
                        <h2 className="text-center">{item}</h2>
                    </div>
                );
            })}
        </div>
    )
}

export default TableOptions