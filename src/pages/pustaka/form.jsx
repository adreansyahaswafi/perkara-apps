import Breadcrumb from "../../components/BreadCrumbs"
import Input from "../../components/HooksForm/Input";
import FormProvider from '../../components/HooksForm/Form';
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import Textarea from "../../components/HooksForm/TextArea";
import usePostData from "./hooks-integration/usePostData";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import useDetailData from "./hooks-integration/useDetailData";
import usePutData from "./hooks-integration/usePutData";
import Uploaders from "../../components/HooksForm/Uploaders";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";

const Form = ({ title, level }) => {
    const { id } = useParams();
    const { postData } = usePostData();
    const { postData: PostUpdate } = usePutData({ id });

    const breadcrumbItems = [
        { label: 'Pustaka Pasal', href: '/pustaka' },
        { label: 'Create' },
    ];

    const breadcrumbItemsedit = [
        { label: 'Pustaka Pasal', href: '/pustaka' },
        { label: 'Detail Pustaka Pasal', href: `/pustaka/${id}` },
        { label: 'Edit Pustaka Pasal', href: `/pustaka/${id}/edit` },
    ];

    const defaultValue = {
        nama_peraturan: "",
        jenis_peraturan: "",
        tahun_peraturan: "",
        documents: null
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('nama_peraturan', data?.nama_peraturan);
        formData.append('jenis_peraturan', data?.jenis_peraturan);
        formData.append('tahun_peraturan', data?.tahun_peraturan);
        formData.append('link_pdf', data?.documents);
        if (id) {
            PostUpdate(formData);
        } else {
            postData(formData);
        }
    };
    if (!['master', 'admin'].includes(level)) return null
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex justify-between items-center">
                    {!id && <Breadcrumb items={breadcrumbItems} />}
                    {id && <Breadcrumb items={breadcrumbItemsedit} />}
                </div>
            </div>
            <FormProvider onSubmit={onSubmit} defaultValues={defaultValue} className="flex flex-col gap-2 my-4">
                {id && <IsEdit id={id} />}
                <div className="shadow-lg relative my-8 border-t-blue-400 border-t-2 rounded-sm p-6 bg-white">
                    <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Form Pustaka</h2>
                    <div className="grid grid-cols-1 my-4">
                        <div className="flex flex-col gap-2">
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Nama Peraturan</label>
                                <Input validation={["required"]} name="nama_peraturan" className="text-sm px-3" placeholder="Nama peraturan..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Jenis Peraturan</label>
                                <Textarea rows={6} validation={["required"]} name="jenis_peraturan" className="text-sm px-3" placeholder="Jenis peraturan..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Tahun Peraturan</label>
                                <Input validation={["required"]} name="tahun_peraturan" className="text-sm px-3" placeholder="Tahun peraturan..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Tahun Peraturan</label>
                                <Uploaders
                                    name="documents"
                                    // validation={!id && ["required"]}
                                    // validationMessage={["Image is required"]}
                                    fileTypes={["PDF"]}
                                    info="Only PDF are allowed"
                                    children={
                                        <button
                                            type="button"
                                            className={`p-2 px-6 w-[20rem]  flex-1 flex items-center gap-2 cursor-pointer rounded-md text-base text-gray-400`}
                                        >
                                            <BookmarkSquareIcon className="h-6" />
                                            <span>Ganti File</span>
                                        </button>
                                    }
                                />
                            </div>
                            <div className="pt-3">
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="submit"
                                        className={`p-2 px-6 bg-blue-500 flex items-center gap-2 cursor-pointer rounded-md text-base text-white hover:bg-blue-600 hover:text-white`}
                                    >
                                        <PlusCircleIcon className="h-6" />
                                        <span>Submit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </div>
    );
};

export const IsEdit = ({ id }) => {
    const { setValue } = useFormContext();
    const { data, loading } = useDetailData({ id });

    useEffect(() => {
        if (loading === 'resolved') {
            const formData = data.data.content;
            Object.entries(formData).forEach(([key, value]) => {
                setValue(key, value ?? '');
            });
        }
    }, [loading]);

    return null;
};

export default Form;
