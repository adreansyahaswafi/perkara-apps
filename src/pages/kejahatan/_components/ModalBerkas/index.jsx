import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import Form from "../../../../components/HooksForm/Form";
import Input from "../../../../components/HooksForm/Input";
import DatePicker from "../../../../components/HooksForm/DatePicker";
import { useParams } from "react-router-dom";
import usePutData from "../../hooks-integration/usePutData";

const ModalBerkasPerkara = ({ data, isOwnAction, onClose }) => {
    const { id } = useParams();
    const { postData: PostUpdate, } = usePutData({ id });

    const defaultValues = {
        nomor_berkas: data?.data?.content?.berkas_perkara?.nomor_berkas ?? "",
        tanggal_berkas: data?.data?.content?.berkas_perkara?.tanggal_berkas ?? "",
        nomor_kepolisian: data?.data?.content?.berkas_perkara?.nomor_kepolisian ?? "",
        tanggal_kepolisian: data?.data?.content?.berkas_perkara?.tanggal_kepolisian ?? "",
        nomor_kejaksaan: data?.data?.content?.berkas_perkara?.nomor_kejaksaan ?? "",
        tanggal_kejaksaan: data?.data?.content?.berkas_perkara?.tanggal_kejaksaan ?? ""
    };
    const handleSubmit = (value) => {
        const body = {
            "no_laporan": data?.data?.content?.no_laporan,
            "tanggal_laporan": data?.data?.content?.tanggal_laporan,
            "tanggal_pidana": data?.data?.content?.tanggal_pidana,
            "singkat_kejadian": data?.data?.content?.singkat_kejadian,
            "taksiran_kerugian": data?.data?.content?.taksiran_kerugian,
            "detail_pelapor": data?.data?.content?.detail_pelapor,
            "berkas_perkara": value
        }
        PostUpdate(body);
        setTimeout(() => {
            isOwnAction();
            onClose();
        }, 500)
    }
    return (
        <Form defaultValues={defaultValues} onSubmit={handleSubmit}>
            <div className="pt-8 flex flex-col gap-6">

                <SectionBerkasInput
                    label="Nomor, Tanggal Berkas Perkara"
                    nomorName="nomor_berkas"
                    tanggalName="tanggal_berkas"
                />

                <SectionBerkasInput
                    label="Nomor, Tanggal Dikirim ke Kepolisian"
                    nomorName="nomor_kepolisian"
                    tanggalName="tanggal_kepolisian"
                />

                <SectionBerkasInput
                    label="Nomor, Tanggal Dikirim ke Kejaksaan"
                    nomorName="nomor_kejaksaan"
                    tanggalName="tanggal_kejaksaan"
                />
            </div>

            <div className="flex justify-between items-center pt-6">
                <button
                    type="submit"
                    className="p-2 px-4 bg-green-600 text-white text-sm rounded-md flex items-center gap-1 hover:bg-green-700"
                >
                    <ArrowRightIcon className="h-5" />
                    Update
                </button>
            </div>
        </Form>
    );
};

// ✅ Subcomponent langsung di dalam file ini
const SectionBerkasInput = ({ label, nomorName, tanggalName }) => {
    const { setValue } = useFormContext();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm mb-2 font-semibold leading-0 flex flex-col gap-2 text-gray-800">{label}</label>
            <div className="flex gap-4">
                <div className="grid gap-3 flex-1">
                    <Input
                        name={nomorName}
                        placeholder="Nomor"
                        validation={["required"]}
                        className="text-sm px-3 w-full"
                    />
                </div>
                <div id="my-portal" className="leading-0 flex flex-col gap-2 flex-1">
                    <DatePicker
                        name={tanggalName}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy HH:mm"
                        placeholder="Tanggal & Jam"
                        validation={["required"]}
                        className="text-sm px-3 m-4 w-full"
                        onChange={(date) => {
                            const formatted = format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                            setValue(tanggalName, formatted);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalBerkasPerkara;
