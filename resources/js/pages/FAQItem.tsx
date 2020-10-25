import React, { useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../components/base/Image";
import cx from 'classnames';

type TFAQItem = {
    title: string;
    content: string;
}

export const FAQItem: React.FC<{item: TFAQItem }> = ({ item }) => {
    const titleRef = useRef(null);
    const [open, setOpen] = useState(false);

    return (
        <div className={cx("item", { open })}>
            <div className="icon-wrapper" onClick={() => setOpen(!open)}>
                <Icon name={open ? "minus-green" : "plus-green"} />
            </div>
            <h3 ref={titleRef} onClick={() => setOpen(!open)}>{item.title}</h3>
            <div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
    )
}