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
import DatePicker from "../../components/HooksForm/DatePicker";
import { format } from "date-fns";

const Form = ({ title }) => {
    const { id } = useParams();
    const { postData } = usePostData();
    const { postData: PostUpdate } = usePutData({ id });

    const breadcrumbItems = [
        { label: 'Kejahatan/Pelanggaran', href: '/kejahatan' },
        { label: 'Create' },
    ];

    const breadcrumbItemsedit = [
        { label: 'Kejahatan/Pelanggaran', href: '/kejahatan' },
        { label: 'Detail Kejahatan/Pelanggaran', href: `/kejahatan/${id}` },
        { label: 'Edit Kejahatan/Pelanggaran', href: `/kejahatan/${id}/edit` },
    ];
    const defaultValue = {
        "no_laporan": "",
        "tanggal_laporan": "",
        "tanggal_pidana": "",
        "singkat_kejadian": "",
        "taksiran_kerugian": "",
        "detail_pelapor": "",
    }
    const onSubmit = (data) => {
        if (id) {
            PostUpdate(data);
        }
        else {
            postData({
                ...data,
                tanggal_laporan: new Date()
            });
        }
    };
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
                <div className="shadow-lg relative my-8 border-t-red-400 border-t-2 rounded-sm p-6 bg-white">
                    <h2 className="text-xl absolute top-[-1.5rem] bg-red-400 w-sm p-2 font-bold text-white px-4">Form Kejahatan/Pelanggaran</h2>
                    <div className="grid grid-cols-1 my-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="leading-0 flex flex-1 flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-600">Nomor Laporan Polisi</label>
                                    <Input validation={["required"]} name="no_laporan" className="text-sm px-3" placeholder="Nomor laporan..." />
                                </div>
                                <div className="leading-0 flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-600">Tanggal Laporan Polisi</label>
                                    <TanggalLaporan />
                                </div>
                                <div className="leading-0 flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-600">Tanggal Terjadinya Tindak Pidana</label>
                                    <TanggalPidana />
                                </div>
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Keterangan Singkat Terjadinya Tindak Pidana</label>
                                <Textarea
                                    className="text-sm"
                                    name="singkat_kejadian"
                                    placeholder="Uraian Singkat Kejadian..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Taksiran Kerugian</label>
                                <Input
                                    className="text-sm px-2"
                                    name="taksiran_kerugian"
                                    placeholder="Taksiran Kerugian..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Nama, Pekerjaan Tempat Tinggal Yang Dirugikan</label>
                                <Textarea
                                    className="text-sm"
                                    name="detail_pelapor"
                                    placeholder="Detail Pelapor..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
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
    )
};
export const TanggalLaporan = () => {
    const { setValue } = useFormContext();
    return (
        <DatePicker
            name="tanggal_laporan"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholder="Tanggal & Jam"
            validation={["required"]}
            className="text-sm px-3 m-4 w-full"
            onChange={(date) => {
                const formatted = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                setValue("tanggal_laporan", formatted);
            }}
        />
    )
}
export const TanggalPidana = () => {
    const { setValue } = useFormContext();
    return (
        <DatePicker
            name="tanggal_pidana"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholder="Tanggal & Jam"
            validation={["required"]}
            className="text-sm px-3 m-4 w-full"
            onChange={(date) => {
                const formatted = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                setValue("tanggal_pidana", formatted);
            }}
        />
    )
}
export const IsEdit = ({ id }) => {
    const { setValue } = useFormContext();
    const { data, loading } = useDetailData({ id });
    useEffect(() => {
        if (loading === 'resolved') {
            const formData = data.data.content;
            Object.entries(formData).forEach(([key, value]) => {
                setValue(key, value ?? ''); // handle null/undefined
            });
        }
    }, [loading]);
    return null
}

export default Form;