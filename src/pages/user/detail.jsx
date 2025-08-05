import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumbs";
import useDetailData from "./hooks-integration/useDetailData";
import { format } from 'date-fns';
import { id as idDate } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const Detail = ({ title }) => {
    const breadcrumbItems = [
        { label: 'users', href: '/user' },
        { label: 'Detail user' },
    ];
    const { id } = useParams();
    const { data, loading } = useDetailData({ id });
    const [date, setDate] = useState('-');
    useEffect(() => {
        if (loading === 'resolved') {
            const tanggal = new Date(data?.data?.content?.createdDate);
            const hasil = format(tanggal, "EEEE, dd MMMM yyyy | hh:mm", { locale: idDate });
            setDate(hasil)
        }
        else {
            setDate('-')
        }
    }, [date, loading]);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="rounded-md relative mt-8 text-base shadow-lg p-6 border-t-2 border-t-blue-400">
                <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Informasi User</h2>
                <div className="flex my-4 gap-2">
                    <div className="w-32 text-base font-semibold">Nama</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.name}</div>
                </div>
                <div className="flex my-4 gap-2">
                    <div className="w-32 font-semibold">Email</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.email}</div>
                </div>
                <div className="flex my-4 gap-2">
                    <div className="w-32 font-semibold">No. Telpon</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.phone}</div>
                </div>
                <div className="flex my-4 gap-2">
                    <div className="w-32 font-semibold">Jabatan</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.jabatan}</div>
                </div>
                <div className="flex my-4 gap-2">
                    <div className="w-32 font-semibold">Terdaftar</div>
                    <div>:</div>
                    <div className="flex-1">{date}</div>
                </div>
            </div>
            <div className="flex justify-end">
                <Link
                    to={`/user/${id}/edit`}
                    className={`p-2 px-6 bg-green-600 flex items-center gap-2 cursor-pointer rounded-md text-base text-white hover:bg-green-700 hover:text-white`}
                >
                    <PencilSquareIcon className="h-6" />
                    <span>Edit</span>
                </Link>
            </div>
        </div>
    )
};

export default Detail;