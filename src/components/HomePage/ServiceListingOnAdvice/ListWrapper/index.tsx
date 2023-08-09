import React from "react";
import ListHeading from "../ListHeading";
import ListContainer from "../ListContainer";
import { IserviceList } from "..";
import { list } from "postcss";

const ListWrapper = ({listContent}:{listContent:IserviceList[]}) => {
    console.log(listContent)
    return (
        <div>
            {
                listContent?.map(item => {
                    return (
                        <div className="mb-7">
                            <ListHeading serviceTitle={item?.serviceType}/>
                            <ListContainer services={item?.services}/>
                        </div>
                    )
                })
            }
      </div>
    )
}

export default ListWrapper;