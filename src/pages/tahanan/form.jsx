import Breadcrumb from "../../components/BreadCrumbs";
import Input from "../../components/HooksForm/Input";
import FormProvider from "../../components/HooksForm/Form";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import Textarea from "../../components/HooksForm/TextArea";
import usePostData from "./hooks-integration/usePostData";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import useDetailData from "./hooks-integration/useDetailData";
import usePutData from "./hooks-integration/usePutData";
import SelectField from "../../components/HooksForm/Select";
import DatePicker from "../../components/HooksForm/DatePicker";
import { format } from "date-fns";

const Form = ({ title }) => {
    const { id } = useParams();
    const { postData } = usePostData();
    const { postData: PostUpdate } = usePutData({ id });

    const breadcrumbItems = [
        { label: "Data Tahanan", href: "/tahanan" },
        { label: "Create" },
    ];

    const breadcrumbItemsedit = [
        { label: "Data Tahanan", href: "/tahanan" },
        { label: "Detail Tahanan", href: `/tahanan/${id}` },
        { label: "Edit Tahanan", href: `/tahanan/${id}/edit` },
    ];

    const defaultValue = {
        nama_tahanan: "",
        umur: "",
        jenis_kelamin: "",
        perkara_pasal: "",
        alamat: "",
        no_laporan_polisi: "",
        no_surat_penahanan: "",
        no_surat_permintaan_perpanjang_tahanan: "",
        no_surat_perintah_perpanjang_tahanan: "",
        no_surat_perintah_penangguhan_tahanan: "",
        no_surat_perintah_pengalihan_tahanan: "",
        no_surat_perintah_pengeluaran_tahanan: "",
        pasal_pidana: "",
        tanggal_masuk: "",
        tanggal_keluar: "",
        keterangan: "",
    };

    const onSubmit = (data) => {
        if (id) {
            PostUpdate(data);
        } else {
            postData(data);
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
                    <h2 className="text-xl absolute top-[-1.5rem] bg-red-400 w-sm p-2 font-bold text-white px-4">
                        Form Tahanan
                    </h2>
                    <div className="grid grid-cols-1 my-4">
                        <div className="flex flex-col gap-4">
                            <InputField label="Nama Tahanan" name="nama_tahanan" />
                            <InputField label="Umur" name="umur" />
                            <SelectField
                                name="jenis_kelamin"
                                label="Jenis Kelamin"
                                placeholder="Pilih jenis kelamin"
                                options={[
                                    { label: "Laki-Laki", value: "laki-laki" },
                                    { label: "Perempuan", value: "perempuan" },
                                ]}
                                validation={["required"]}
                            />
                            <TextareaField rows={6} label="Perkara Dan Pasal Yang Dilanggar" name="perkara_pasal" />
                            <TextareaField rows={6} label="Alamat" name="alamat" />
                            <InputField label="Nomor Laporan Polisi" name="no_laporan_polisi" />
                            <InputField label="Nomor Surat Perintah Penahanan" name="no_surat_penahanan" />
                            <InputField label="Nomor Surat Permintaan Perpanjangan Penahanan" name="no_surat_permintaan_perpanjang_tahanan" />
                            <InputField label="Nomor Surat Perintah Perpanjangan Penahanan" name="no_surat_perintah_perpanjang_tahanan" />
                            <InputField label="Nomor Surat Perintah Penangguhan Penahanan" name="no_surat_perintah_penangguhan_tahanan" />
                            <InputField label="Nomor Surat Perintah Pengalihan jenis Penahanan" name="no_surat_perintah_pengalihan_tahanan" />
                            <InputField label="Nomor Surat Perintah Pengeluaran Tahanan" name="no_surat_perintah_pengeluaran_tahanan" />
                            <TextareaField rows={6} label="Tindak Pidana & Pasal Yang Dipersangkakan" name="pasal_pidana" />
                            <div className="flex w-full gap-2">
                                <DatePickerField label="Tanggal Masuk" name="tanggal_masuk" type="date" />
                                <DatePickerField label="Tanggal Keluar" name="tanggal_keluar" type="date" />
                            </div>
                            <TextareaField label="Keterangan" name="keterangan" />
                            <div className="pt-4">
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

const DatePickerField = ({ label, name, type = "text" }) => {
    const { setValue } = useFormContext();
    return (
        <div className="leading-0 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <DatePicker
                validation={name === 'tanggal_masuk' ? ["required"] : ""}
                name={name}
                type={type}
                className="text-sm px-3"
                placeholder={`${label}...`}
                onChange={(date) => {
                    const dates = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                    setValue(name, dates);
                }}
            />
        </div>
    )
};

const InputField = ({ label, name, type = "text" }) => (
    <div className="leading-0 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <Input
            validation={["required"]}
            name={name}
            type={type}
            className="text-sm px-3"
            placeholder={`${label}...`}
        />
    </div>
);

const TextareaField = ({ label, name }) => (
    <div className="leading-0 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <Textarea
            className="text-sm"
            name={name}
            placeholder={`${label}...`}
            validation={["required"]}
            validationMessage={[`${label} wajib diisi.`]}
            rows={4}
        />
    </div>
);

export const IsEdit = ({ id }) => {
    const { setValue } = useFormContext();
    const { data, loading } = useDetailData({ id });

    useEffect(() => {
        if (loading === "resolved") {
            const formData = data.data.content;
            Object.entries(formData).forEach(([key, value]) => {
                setValue(key, value ?? "");
            });
        }
    }, [loading]);

    return null;
};

export default Form;
