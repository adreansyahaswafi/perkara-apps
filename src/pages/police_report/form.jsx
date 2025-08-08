import Breadcrumb from "../../components/BreadCrumbs"
import Input from "../../components/HooksForm/Input";
import FormProvider from '../../components/HooksForm/Form';
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import Textarea from "../../components/HooksForm/TextArea";
import DatePicker from "../../components/HooksForm/DatePicker";
import usePostData from "./hooks-integration/usePostData";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import useDetailData from "./hooks-integration/useDetailData";
import usePutData from "./hooks-integration/usePutData";
import { format } from "date-fns";

const Form = ({ title, level }) => {
    const { id } = useParams();
    const { postData } = usePostData();
    const { postData: PostUpdate } = usePutData({ id });

    const breadcrumbItems = [
        { label: 'Laporan Polisi', href: '/laporan-polisi' },
        { label: 'Create' },
    ];

    const breadcrumbItemsedit = [
        { label: 'Laporan Polisi', href: '/laporan-polisi' },
        { label: 'Detail Laporan Polisi', href: `/laporan-polisi/${id}` },
        { label: 'Edit Laporan Polisi', href: `/laporan-polisi/${id}/edit` },
    ];
    const defaultValue = {
        "no_laporan": "",
        "pelapor": "",
        "terlapor": "",
        "lokasi": "",
        "tanggal_kejadian": null,
        "tanggal_laporan": null,
        "pasal": "",
        "barang_bukti": "",
        "tersangka": "",
        "perkembangan": [{
            "pic": "",
            "tanggal_update": "",
            "keterangan": "",
        }],
        "status": "",
        "umur_pelapor": "",
        "singkat_kejadian": "",
        "alamat_pelapor": "",
        "petugas_penerima": "",
    }
    const onSubmit = (data) => {
        if (id) {
            PostUpdate(data);
        }
        else {
            postData(data);
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
                    <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Form Laporan Polisi</h2>
                    <div className="grid grid-cols-1 my-4">
                        <div className="flex flex-col gap-2">
                            <div className="grid gap-3 grid-cols-3">
                                <div className="leading-0 flex flex-col gap-2 flex-1">
                                    <label className="text-sm font-medium text-gray-600">No. LP</label>
                                    <Input validation={["required"]} name="no_laporan" className="text-sm px-3" placeholder="Nomor laporan..." />
                                </div>
                                <div className="leading-0 flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-600">Tanggal/Jam Dilaporkan</label>
                                    <Dilaporkan />
                                </div>
                                <div className="leading-0 flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-600">Tanggal/Jam Kejadian</label>
                                    <Kejadian />
                                </div>
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">T.K.P</label>
                                <Textarea
                                    className="text-sm"
                                    name="lokasi"
                                    placeholder="TKP..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Pelapor</label>
                                <Textarea
                                    className="text-sm"
                                    name="pelapor"
                                    placeholder="Pelapor..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
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
                                    placeholder="Pelapor..."
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
                                <label className="text-sm font-medium text-gray-600">Barang Bukti</label>
                                <Textarea
                                    className="text-sm"
                                    name="barang_bukti"
                                    placeholder="Tersangka..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Yang Menerima Laporan</label>
                                <Textarea
                                    className="text-sm"
                                    name="petugas_penerima"
                                    placeholder="Yang Menerima Laporan..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Uraian Kejadian</label>
                                <Textarea
                                    className="text-sm"
                                    name="singkat_kejadian"
                                    placeholder="Tersangka..."
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
                                    placeholder="Tersangka..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Perkembangan</label>
                                <Perkembangan />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <Input validation={["required"]} name="status" className="text-sm px-3" placeholder="Status..." />
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

export const TanggalUpdate = ({ name }) => {
    const { setValue } = useFormContext();
    return (
        <DatePicker
            name={name}
            minDate={new Date()}
            showTimeSelect
            validation={["required"]}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholder="Tanggal/Jam Laporan"
            onChange={(date) => {
                const dates = format(new Date(date), "yyyy-MM-dd HH:mm:ss");
                setValue(name, dates);
            }}
        />
    )
}

export const Dilaporkan = () => {
    const { setValue } = useFormContext();
    return (
        <DatePicker
            name="tanggal_laporan"
            minDate={new Date()}
            showTimeSelect
            validation={["required"]}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholder="Tanggal/Jam Laporan"
            onChange={(date) => {
                const dates = format(new Date(date), "yyyy-MM-dd HH:mm:ss");
                setValue('tanggal_laporan', dates);
            }}
        />
    )
}

export const Kejadian = () => {
    const { setValue } = useFormContext();
    return (
        <DatePicker
            name="tanggal_kejadian"
            minDate={new Date()}
            showTimeSelect
            validation={["required"]}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholder="Tanggal/Jam Kejadian"
            onChange={(date) => {
                const dates = format(new Date(date), "yyyy-MM-dd HH:mm:ss");
                setValue('tanggal_kejadian', dates);
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
            console.log(formData)
            Object.entries(formData).forEach(([key, value]) => {
                setValue(key, value ?? ''); // handle null/undefined
            });
        }
    }, [loading]);
    return null
}

export const Perkembangan = () => {
    const { watch, setValue } = useFormContext();
    const fields = watch('perkembangan');
    const handleAddField = () => {
        setValue('perkembangan', [...fields, { tanggal_update: '', pic: '', keterangan: '' }]);
    };
    const handleRemoveField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setValue('perkembangan', newFields);

    };
    return (
        <div className="flex gap-4 flex-col relative items-center p-8 border border-gray-300 rounded-md">
            {
                fields?.map((_, index) => {
                    return (
                        <div className="flex w-full gap-2" key={index}>
                            <div className="leading-0 flex flex-col gap-2 flex-1">
                                <label className="text-sm font-medium text-gray-600">Tanggal Update</label>
                                <TanggalUpdate name={`perkembangan.${index}.tanggal_update`} />
                            </div>
                            <div className="leading-0 flex flex-col gap-2 flex-1">
                                <label className="text-sm font-medium text-gray-600">PIC</label>
                                <Input
                                    className="text-sm px-3"
                                    name={`perkembangan.${index}.pic`}
                                    placeholder="PIC..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                />
                            </div>
                            <div className="leading-0 flex flex-col gap-2 flex-1">
                                <label className="text-sm font-medium text-gray-600">Status Perkembangan</label>
                                <Input
                                    className="text-sm px-3"
                                    name={`perkembangan.${index}.keterangan`}
                                    placeholder="Perkembangan..."
                                    validation={["required"]}
                                    validationMessage={["Keterangan wajib diisi."]}
                                    rows={4}
                                />
                            </div>
                            <div>
                                {index === 0 && <button
                                    onClick={handleAddField}
                                    className="bg-blue-400 p-3 mt-7 cursor-pointer rounded-full" type="button">
                                    <PlusIcon className="h-4 text-white" />
                                </button>}
                                {index > 0 && <button
                                    onClick={() => handleRemoveField(index)}
                                    className="bg-red-400 p-3 mt-7 cursor-pointer rounded-full" type="button">
                                    <PlusIcon className="h-4 text-white" />
                                </button>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Form;