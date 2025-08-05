import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumbs";
import useDetailData from "./hooks-integration/useDetailData";
import { format } from 'date-fns';
import { id as idDate } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const Detail = ({ title }) => {
    const breadcrumbItems = [
        { label: 'Laporan Polisi', href: '/laporan-polisi' },
        { label: 'Detail Laporan Polisi' },
    ];
    const { id } = useParams();
    const { data, loading } = useDetailData({ id });
    const [tanggal_kejadian, setDateKejadian] = useState('-');
    const [tanggal_laporan, setDateLaporan] = useState('-');
    useEffect(() => {
        if (loading === 'resolved') {
            const tanggalkejadian = new Date(data?.data?.content?.tanggal_kejadian);
            const hasilkejadian = format(tanggalkejadian, "EEEE, dd MMMM yyyy | hh:mm", { locale: idDate });
            setDateKejadian(hasilkejadian);

            const tanggallaporan = new Date(data?.data?.content?.tanggal_laporan);
            const hasillaporan = format(tanggallaporan, "EEEE, dd MMMM yyyy | hh:mm", { locale: idDate });
            setDateLaporan(hasillaporan);
        }
        else {
            setDateKejadian("-");
            setDateLaporan("-");
        }
    }, [tanggal_kejadian, tanggal_laporan, loading]);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="rounded-md relative mt-8 text-base shadow-lg p-6 border-t-2 border-t-blue-400">
                <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Informasi Laporan Polisi</h2>
                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">No. Laporan</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.no_laporan}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Pelapor</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.pelapor}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Umur Pelapor</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.umur_pelapor}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Alamat Pelapor</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.alamat_pelapor}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Terlapor</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.terlapor}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Tersangka</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.tersangka}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Lokasi Kejadian</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.lokasi}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Tanggal Kejadian</div>
                    <div>:</div>
                    <div className="flex-1">
                        {tanggal_kejadian}
                    </div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Tanggal Laporan</div>
                    <div>:</div>
                    <div className="flex-1">
                        {tanggal_laporan}
                    </div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Yang Menerima Laporan</div>
                    <div>:</div>
                    <div className="flex-1">{data?.data?.content?.petugas_penerima}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Barang Bukti</div>
                    <div>:</div>
                    <div className="flex-1 whitespace-break-spaces">{data?.data?.content?.barang_bukti}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Pasal</div>
                    <div>:</div>
                    <div className="flex-1 whitespace-break-spaces">{data?.data?.content?.pasal}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Uraian Kejadian</div>
                    <div>:</div>
                    <div className="flex-1 whitespace-pre-wrap">{data?.data?.content?.singkat_kejadian}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Perkembangan</div>
                    <div>:</div>
                    <div className="flex-1 ">{data?.data?.content?.perkembangan}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Keterangan</div>
                    <div>:</div>
                    <div className="flex-1 whitespace-pre-wrap">{data?.data?.content?.keterangan}</div>
                </div>

                <div className="flex my-2 gap-2">
                    <div className="w-52 font-semibold">Status</div>
                    <div>:</div>
                    <div className="flex-1 capitalize">{data?.data?.content?.status}</div>
                </div>
            </div>
            <div className="flex justify-end">
                <Link
                    to={`/laporan-polisi/${id}/edit`}
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