import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumbs";
import useDetailData from "./hooks-integration/useDetailData";
import { format } from 'date-fns';
import { id as idDate } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "../../components/Modal";
import ModalTersangka from "./_components/ModalTersangka";
import ModalBerkasPerkara from "./_components/ModalBerkas";
import ModalPutusanPerkaran from "./_components/ModalPutusan";
import ModalPasalPerkara from "./_components/ModalPasal";
import ModalDataLainnya from "./_components/ModalDataLainnya";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useDeletedData from "./hooks-integration/useDeleteData";

const Detail = ({ title }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, isOwnAction } = useDetailData({ id });
    const { postData } = useDeletedData();
    const [tanggalLaporanFormatted, setTanggalLaporanFormatted] = useState('-');
    const [tanggalPidanaFormatted, setTanggalPidanaFormatted] = useState('-');

    const [openTersangka, setOpenTersangka] = useState(false);
    const [openBerkas, setOpenBerkas] = useState(false);
    const [openPutusan, setOpenPutusan] = useState(false);
    const [openPasal, setOpenPasal] = useState(false);
    const [openDataLain, setOpenDataLain] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        if (loading === 'resolved') {
            const laporanDate = new Date(data?.data?.content?.tanggal_laporan);
            const pidanaDate = new Date(data?.data?.content?.tanggal_pidana);

            setTanggalLaporanFormatted(format(laporanDate, "EEEE, dd MMMM yyyy", { locale: idDate }));
            setTanggalPidanaFormatted(format(pidanaDate, "EEEE, dd MMMM yyyy | HH:mm", { locale: idDate }));
        }
    }, [loading, data]);

    const content = data?.data?.content || {};

    const formatRupiah = (value) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);

    const Info = ({ label, value }) => (
        <div className="flex my-2 gap-3">
            <div className="w-80 font-semibold">{label}</div>
            <div>:</div>
            <div className="flex-1 whitespace-pre-wrap">{value || "-"}</div>
        </div>
    );

    const handleDelete = () => {
        postData({ id });
        isOwnAction();
    }

    const Section = ({ title, onEdit, children }) => (
        <div className="rounded-md relative mt-8 text-base shadow-lg px-6 pt-10 pb-5 border-t-2 border-t-blue-400">
            <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 p-2 font-bold text-white px-4">{title}</h2>
            <div className="flex flex-col gap-1">{children}</div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={onEdit}
                    className="p-2 px-6 bg-green-600 flex items-center gap-2 rounded-md text-white hover:bg-green-700"
                >
                    <PencilSquareIcon className="h-6" />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    );

    const ModalSection = ({ isOpen, onClose, title, children }) => (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-600">{title}</h2>
                <div onClick={onClose} className="p-2 cursor-pointer">
                    <XMarkIcon className="h-6 text-gray-600" />
                </div>
            </div>
            {children}
        </Modal>
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => { setOpenDelete(!openDelete) }}
                        className="p-2 px-6 bg-red-400 cursor-pointer text-sm flex items-center gap-2 rounded-md text-white hover:bg-red-500"
                    >
                        <TrashIcon className="h-6" />
                        <span>Hapus Kejahatan/Pelanggaran</span>
                    </button>
                </div>
            </div>
            <Breadcrumb items={[
                { label: 'Kejahatan/Pelanggaran', href: '/kejahatan' },
                { label: 'Detail Kejahatan/Pelanggaran' },
            ]} />

            {/* Informasi Utama */}
            <Section title="Informasi Kejahatan/Pelanggaran" onEdit={() => navigate(`/kejahatan/${id}/edit`)}>
                <Info label="Nomor & Tanggal Laporan" value={`${content.no_laporan} | ${tanggalLaporanFormatted}`} />
                <Info label="Tanggal Pidana" value={tanggalPidanaFormatted} />
                <Info label="Pelapor" value={content.detail_pelapor} />
                <Info label="Kerugian" value={formatRupiah(content.taksiran_kerugian)} />
                <Info label="Uraian Kejadian" value={content.singkat_kejadian} />
            </Section>

            <Section title="Informasi Tersangka" onEdit={() => setOpenTersangka(true)}>
                <Info label="Nama" value={content.tersangka?.detail_tersangka} />
                <Info label="Warga Negara" value={content.tersangka?.kewarganegaraan} />
                <Info label="Jenis Kelamin" value={content.tersangka?.jenis_kelamin} />
                <Info label="Umur" value={content.tersangka?.umur} />
            </Section>

            <Section title="Informasi Berkas Perkara" onEdit={() => setOpenBerkas(true)}>
                {/* Tambahan baru */}
                <Info
                    label="Nomor, Tanggal Berkas Perkara"
                    value={
                        [
                            content.berkas_perkara?.nomor_berkas,
                            content.berkas_perkara?.tanggal_berkas && format(new Date(content.berkas_perkara?.tanggal_berkas), "EEEE, dd MMMM yyyy HH:mm", { locale: idDate })
                        ]
                            .filter(Boolean)
                            .join(" - ")
                    }
                />

                <Info
                    label="Nomor, Tanggal Dikirim ke Kepolisian"
                    value={
                        [
                            content.berkas_perkara?.nomor_kepolisian,
                            content.berkas_perkara?.tanggal_kepolisian && format(new Date(content.berkas_perkara?.tanggal_kepolisian), "EEEE, dd MMMM yyyy HH:mm", { locale: idDate })
                        ]
                            .filter(Boolean)
                            .join(" - ")
                    }
                />

                <Info
                    label="Nomor, Tanggal Dikirim ke Kejaksaan"
                    value={
                        [
                            content.berkas_perkara?.nomor_kejaksaan,
                            content.berkas_perkara?.tanggal_kejaksaan && format(new Date(content.berkas_perkara?.tanggal_kejaksaan), "EEEE, dd MMMM yyyy HH:mm", { locale: idDate })
                        ]
                            .filter(Boolean)
                            .join(" - ")
                    }
                />
            </Section>


            <Section title="Informasi Putusan Hakim" onEdit={() => setOpenPutusan(true)}>
                <Info
                    label="Nomor Putusan (Vonis), Tanggal Putusan Hakim"
                    value={
                        [
                            content.putusan_hakim?.nomor_putusan,
                            content.putusan_hakim?.tanggal_putusan && format(new Date(content.putusan_hakim?.tanggal_putusan), "EEEE, dd MMMM yyyy HH:mm", { locale: idDate })
                        ]
                            .filter(Boolean)
                            .join(" - ")
                    }
                />

                <Info
                    label="Hukuman Badan Apa, Berapa Lama"
                    value={content.putusan_hakim?.detail_hukuman}
                />

                <Info
                    label="Hukuman Denda Rp."
                    value={
                        content.putusan_hakim?.denda != null
                            ? formatRupiah(content.putusan_hakim?.denda)
                            : "-"
                    }
                />

                <Info
                    label="Dilepas Dari Segala Tuntutan / Bebas"
                    value={content.putusan_hakim?.tuntutan}
                />
            </Section>

            <Section title="Informasi Pasal yang Dilanggar" onEdit={() => setOpenPasal(true)}>

                <Info
                    label="Kejahatan"
                    value={content.pasal?.kejahatan}
                />


                <Info
                    label="Bebas"
                    value={content.pasal?.bebas}
                />
            </Section>

            <Section title="Informasi Data Lainnya" onEdit={() => setOpenDataLain(true)}>
                <Info
                    label="Masuk Daftar Residivist"
                    value={content.data_lain?.residivist}
                />


                <Info
                    label="Keterangan"
                    value={content.data_lain?.keterangan}
                />
            </Section>

            {/* Modal Tersangka */}
            <ModalSection isOpen={openTersangka} onClose={() => setOpenTersangka(false)} title="Tersangka">
                <ModalTersangka data={data} onClose={() => setOpenTersangka(false)} isOwnAction={isOwnAction} />
            </ModalSection>

            {/* Modal Berkas */}
            <ModalSection isOpen={openBerkas} onClose={() => setOpenBerkas(false)} title="Berkas Perkara">
                <ModalBerkasPerkara data={data} onClose={() => setOpenBerkas(false)} isOwnAction={isOwnAction} />
            </ModalSection>

            {/* Modal Putusan */}
            <ModalSection isOpen={openPutusan} onClose={() => setOpenPutusan(false)} title="Putusan Hakim">
                <ModalPutusanPerkaran data={data} onClose={() => setOpenPutusan(false)} isOwnAction={isOwnAction} />
            </ModalSection>

            {/* Modal Pasal */}
            <ModalSection isOpen={openPasal} onClose={() => setOpenPasal(false)} title="Pasal Dilanggar">
                <ModalPasalPerkara data={data} onClose={() => setOpenPasal(false)} isOwnAction={isOwnAction} />
            </ModalSection>

            {/* Modal Data Lain */}
            <ModalSection isOpen={openDataLain} onClose={() => setOpenDataLain(false)} title="Data Lainnya">
                <ModalDataLainnya data={data} onClose={() => setOpenDataLain(false)} isOwnAction={isOwnAction} />
            </ModalSection>

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
