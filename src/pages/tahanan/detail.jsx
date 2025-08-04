import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumbs";
import useDetailData from "./hooks-integration/useDetailData";
import { format } from 'date-fns';
import { id as idDate } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import useDeletedData from "./hooks-integration/useDeleteData";
import Modal from "../../components/Modal";

const Detail = ({ title }) => {
    const breadcrumbItems = [
        { label: 'Tahanan', href: '/tahanan' },
        { label: 'Detail Tahanan' },
    ];

    const { id } = useParams();
    const { data, loading } = useDetailData({ id });
    const { postData } = useDeletedData();


    const [tanggalMasuk, setTanggalMasuk] = useState("-");
    const [tanggalKeluar, setTanggalKeluar] = useState("-");

    const [openDelete, setOpenDelete] = useState(false);


    useEffect(() => {
        if (loading === 'resolved') {
            const masuk = data?.data?.content?.tanggal_masuk;
            const keluar = data?.data?.content?.tanggal_keluar;

            if (masuk) {
                setTanggalMasuk(format(new Date(masuk), "EEEE, dd MMMM yyyy", { locale: idDate }));
            }
            if (keluar) {
                setTanggalKeluar(format(new Date(keluar), "EEEE, dd MMMM yyyy", { locale: idDate }));
            }
        }
    }, [loading]);

    const infoItem = (label, value) => (
        <div className="flex my-2 gap-2">
            <div className="w-80 font-semibold">{label}</div>
            <div>:</div>
            <div className="flex-1 whitespace-pre-wrap">{value || '-'}</div>
        </div>
    );
    const handleDelete = () => {
        postData({ id });
    }

    const tahanan = data?.data?.content;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => { setOpenDelete(!openDelete) }}
                            className="p-2 px-6 bg-red-400 cursor-pointer text-sm flex items-center gap-2 rounded-md text-white hover:bg-red-500"
                        >
                            <TrashIcon className="h-6" />
                            <span>Hapus Tahanan</span>
                        </button>
                    </div>
                </div>
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="rounded-md relative mt-8 text-base shadow-lg p-6 border-t-2 border-t-red-400">
                <h2 className="text-xl flex gap-2 absolute top-[-1.5rem] bg-red-400 w-sm p-2 font-bold text-white px-4">Informasi Tahanan</h2>
                <div className="flex flex-col gap-2">
                    {infoItem("Nama Tahanan", tahanan?.nama_tahanan)}
                    {infoItem("Umur", `${tahanan?.umur || '-'} Tahun`)}
                    {infoItem("Jenis Kelamin", tahanan?.jenis_kelamin)}
                    {infoItem("Perkara Dan Pasal Yang Dilanggar", tahanan?.perkara_pasal)}
                    {infoItem("Alamat", tahanan?.alamat)}
                    {infoItem("Nomor Laporan Polisi", tahanan?.no_laporan_polisi)}
                    {infoItem("Nomor Surat Perintah Penahanan", tahanan?.no_surat_penahanan)}
                    {infoItem("Nomor Surat Permintaan Perpanjangan Penahanan", tahanan?.no_surat_permintaan_perpanjang_tahanan)}
                    {infoItem("Nomor Surat Perintah Perpanjangan Penahanan", tahanan?.no_surat_perintah_perpanjang_tahanan)}
                    {infoItem("Nomor Surat Perintah Penangguhan Penahanan", tahanan?.no_surat_perintah_penangguhan_tahanan)}
                    {infoItem("Nomor Surat Perintah Pengalihan Penahanan", tahanan?.no_surat_perintah_pengalihan_tahanan)}
                    {infoItem("Nomor Surat Perintah Pengeluaran Tahanan", tahanan?.no_surat_perintah_pengeluaran_tahanan)}
                    {infoItem("Tindak Pidana & Pasal Yang Dipersangkakan", tahanan?.pasal_pidana)}
                    {infoItem("Tanggal Masuk", tanggalMasuk)}
                    {infoItem("Tanggal Keluar", tanggalKeluar)}
                    {infoItem("Keterangan", tahanan?.keterangan)}
                </div>
            </div>

            <div className="flex justify-end">
                <Link
                    to={`/tahanan/${id}/edit`}
                    className={`p-2 px-6 bg-green-600 flex items-center gap-2 cursor-pointer rounded-md text-base text-white hover:bg-green-700 hover:text-white`}
                >
                    <PencilSquareIcon className="h-6" />
                    <span>Edit</span>
                </Link>
            </div>
            <Modal isOpen={openDelete} onClose={setOpenDelete} title="Konfirmasi">
                <p className="text-gray-600 text-base">
                    Apakah anda ingin hapus data ini ?
                </p>
                <div className="flex gap-2 mt-4 justify-end">
                    <button
                        onClick={() => setOpenDelete(!openDelete)}
                        type="button"
                        className={`p-1 px-2 bg-blue-400 flex items-center gap-1 cursor-pointer rounded-md text-sm text-white hover:bg-blue-500 hover:text-white`}
                    >
                        <XCircleIcon className="h-5" />
                        <span>Tidak</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        type="button"
                        className={`p-2 px-2 bg-red-400 flex items-center gap-1 cursor-pointer rounded-md text-sm text-white hover:bg-red-500 hover:text-white`}
                    >
                        <TrashIcon className="h-5" />
                        <span>Hapus</span>
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Detail;
