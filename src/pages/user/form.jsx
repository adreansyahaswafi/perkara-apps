import Breadcrumb from "../../components/BreadCrumbs"
import Input from "../../components/HooksForm/Input";
import FormProvider from '../../components/HooksForm/Form';
import { UserIcon } from "@heroicons/react/24/outline";
import { CalendarIcon, PhotoIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Uploaders from "../../components/HooksForm/Uploaders";
import usePostData from "./hooks-integration/usePostData";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDetailData from "./hooks-integration/useDetailData";
import usePutData from "./hooks-integration/usePutData";

const currentDate = () => {
    // Use current date
    const today = new Date();

    // Format: 'Rabu, 31 Juli 2025'
    const formatted = format(today, "EEEE, dd MMMM yyyy", { locale: id });
    return formatted;
}

const Form = ({ title }) => {
    const { id } = useParams();
    const { postData: setBody } = usePostData(null);
    const { postData: setBodyUpdate } = usePutData({ id });

    const breadcrumbItems = [
        { label: 'users', href: '/user' },
        { label: 'create' },
    ];

    const breadcrumbItemsedit = [
        { label: 'users', href: '/user' },
        { label: 'detail', href: `/user/${id}` },
        { label: 'edit', href: `/user/${id}/edit` },
    ];

    const defaultValue = {
        name: "",
        email: "",
        password: "",
        images: null,
        jabatan: "",
        phone: "",
        terdaftar: id ? "" : new Date().toISOString()
    }
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data?.name);
        formData.append('email', data?.email);
        formData.append('password', data?.password);
        formData.append('jabatan', data?.jabatan);
        formData.append('phone', data?.phone);
        formData.append('createdDate', data?.terdaftar);
        formData.append('images', data?.images);
        if (id) {
            setBodyUpdate(formData);
        } else {
            setBody(formData);
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex justify-between items-center">
                    {!id && <Breadcrumb items={breadcrumbItems} />}
                    {id && <Breadcrumb items={breadcrumbItemsedit} />}
                    <span className="text-sm flex gap-1 items-center text-gray-600 font-semibold">
                        <CalendarIcon className="h-5 text-gray-600" />
                        {currentDate()}
                    </span>
                </div>
            </div>
            <FormProvider onSubmit={onSubmit} defaultValues={defaultValue} className="flex flex-col gap-2 my-4">
                {id && <IsEdited id={id} />}
                <div className="shadow-lg relative my-8 border-t-blue-400 border-t-2 rounded-sm p-6 bg-white">
                    <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Form User</h2>
                    <div className="grid grid-cols-3">
                        <div className="flex gap-1 flex-col items-center justify-center">
                            <ImagesUploadedShow id={id} />
                            <Uploaders
                                name="images"
                                // validation={!id && ["required"]}
                                validationMessage={["Image is required"]}
                                fileTypes={["JPG", "PNG"]}
                                info="Only JPG and PNG are allowed"
                                children={
                                    <button
                                        type="button"
                                        className={`p-2 px-6 w-full  flex-1 flex items-center gap-2 cursor-pointer rounded-md text-base text-gray-400`}
                                    >
                                        <PhotoIcon className="h-6" />
                                        <span>Ganti Foto</span>
                                    </button>
                                }
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">Nama Lengkap</label>
                                <Input validation={["required"]} name="name" className="text-sm px-3" placeholder="Nama Lengkap..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">Alamat Email</label>
                                <Input validation={["required"]} name="email" className="text-sm px-3" placeholder="Email..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">Password</label>
                                <Input validation={!id && ["required"]} type="password" name="password" className="text-sm px-3" placeholder="password..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">Jabatan</label>
                                <Input validation={["required"]} name="jabatan" className="text-sm px-3" placeholder="Jabatan..." />
                            </div>
                            <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">No. Telpon</label>
                                <Input validation={["required"]} name="phone" className="text-sm px-3" placeholder="No. Telfon..." />
                            </div>
                            {!id && <div className="leading-0 flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-600">Terdaftar</label>
                                <Input disabled validation={["required"]} name="terdaftar" className="text-sm px-3" placeholder="Terdaftar..." />
                            </div>}
                            {id && <div className="leading-0 flex flex-col gap-2">
                                <Terdaftar />
                            </div>}
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

export const Terdaftar = () => {
    const { watch } = useFormContext();
    const preview = watch('preview');
    const [date, setDate] = useState('-');
    useEffect(() => {
        if (preview) {
            const tanggal = new Date(preview);
            const hasil = format(tanggal, "EEEE, dd MMMM yyyy | hh:mm", { locale: id });
            setDate(hasil)
        }
        else {
            setDate('-')
        }
    }, [date, preview]);
    return (
        <div className="text-base my-3">
            <span className="font-bold">Terdaftar dari </span>: {date}
        </div>
    )
}

export const ImagesUploadedShow = ({ id }) => {
    const { watch } = useFormContext();
    const [preview, setPreview] = useState(null);
    const file = watch('images');
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    useEffect(() => {
        if (id) {
            const baseURL = import.meta.env.VITE_API_URL;
            setPreview(`${baseURL}uploads/${file}`);
        }
    }, [id, file])
    useEffect(() => {
        async function imagesShow() {
            if (!file) {
                // console.warn("❌ No file selected");
                return;
            }

            if (!(file instanceof Blob)) {
                // console.warn("❌ Not a valid File or Blob:", file);
                return;
            }

            try {
                const base64 = await toBase64(file);
                setPreview(base64);
            } catch {
                // console.error("❌ Error reading file:", err);
            }
        }
        imagesShow();
    }, [preview, file]);
    if (preview) return (
        <>
            <img src={preview} onError={() => { setPreview('https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png') }} className="border-3 text-sm border-gray-300 object-contain rounded-full" width={128} alt='low-pict' />
            <span className="text-sm text-gray-500">Halo@mail.com</span>
            <span className="text-base text-gray-400">Jhon Doe</span>
        </>
    )
    return (
        <UserIcon className="h-32 border-2 bg-gray-300 text-white rounded-full w-auto p-2" />
    )
}

export const IsEdited = ({ id }) => {
    const { data, loading } = useDetailData({ id });
    const { setValue } = useFormContext();
    useEffect(() => {
        if (loading === 'resolved') {
            setValue('name', data?.data?.content?.name);
            setValue('email', data?.data?.content?.email);
            setValue('jabatan', data?.data?.content?.jabatan);
            setValue('phone', data?.data?.content?.phone);
            setValue('images', data?.data?.content?.images);
            setValue('preview', data?.data?.content?.createdDate);
        }
    }, [data, loading]);
    return null;
}
export default Form;