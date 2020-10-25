import React from "react";
import { useHistory } from "react-router-dom";
import { FormWrapper } from "../../components/FormWrapper";
import { CreateFaqItemForm }  from "../../data/forms/EditFaqItem";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const FAQCreatePage = () => {
    const { t } = useTranslationStore();
    const history = useHistory();

    return (
        <div className="FAQCreatePage">
            <h1>{t("create_faq_item")}</h1>
            <FormWrapper 
                form={CreateFaqItemForm}
                handleSuccess={() => history.push("/admin/faq")}
            />
        </div>
    )
}