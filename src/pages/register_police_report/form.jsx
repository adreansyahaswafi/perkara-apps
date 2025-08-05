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
import SelectField from "../../components/HooksForm/Select";

const Form = ({ title }) => {
    const { id } = useParams();
    const { postData } = usePostData();
    const { postData: PostUpdate } = usePutData({ id });

    const breadcrumbItems = [
        { label: 'Register Laporan Polisi', href: '/register-laporan-polisi' },
        { label: 'Create' },
    ];

    const breadcrumbItemsedit = [
        { label: 'Register Laporan Polisi', href: '/register-laporan-polisi' },
        { label: 'Detail Laporan Polisi', href: `/register-laporan-polisi/${id}` },
        { label: 'Edit Laporan Polisi', href: `/register-laporan-polisi/${id}/edit` },
    ];
    const defaultValue = {
        "no_laporan": "",
        "jenis_kelamin": "",
        "pelapor": "",
        "tanggal_laporan": "",
        "pasal": "",
        "tersangka": "",
        "keterangan": "",
        "umur_pelapor": "",
        "singkat_kejadian": "",
        "alamat_pelapor": "",
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
                <div className="shadow-lg relative my-8 border-t-blue-400 border-t-2 rounded-sm p-6 bg-white">
                    <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Form Laporan Polisi</h2>
                    <div className="grid grid-cols-1 my-4">
                        <div className="flex flex-col gap-2">
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">No. LP</label>
                                <Input validation={["required"]} name="no_laporan" className="text-sm px-3" placeholder="Nomor laporan..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Pelapor</label>
                                <Input validation={["required"]} name="pelapor" className="text-sm px-3" placeholder="Pelapor..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Jenis Kelamin</label>
                                <SelectField
                                    options={[{
                                        label: 'Laki-Laki',
                                        value: 'laki'
                                    }, {
                                        label: 'Perempuan',
                                        value: 'perempuan'
                                    }]}
                                    name="jenis_kelamin"
                                    placeholder="Jenis Kelamin"
                                    validation={["required"]}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Umur Pelapor</label>
                                <Input validation={["required"]} name="umur_pelapor" className="text-sm px-3" placeholder="Umur Pelapor..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Alamat Pelapor</label>
                                <Textarea
                                    className="text-sm"
                                    name="alamat_pelapor"
                                    placeholder="Alamat Pelapor..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Uraian Singkat Kejadian</label>
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
                                <label className="text-sm font-medium text-gray-600">Pasal</label>
                                <Textarea
                                    className="text-sm"
                                    name="pasal"
                                    placeholder="Pasal..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Tersangka</label>
                                <Textarea
                                    className="text-sm"
                                    name="tersangka"
                                    placeholder="Tersangka..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Keterangan</label>
                                <Textarea
                                    className="text-sm"
                                    name="keterangan"
                                    placeholder="Keterangan..."
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