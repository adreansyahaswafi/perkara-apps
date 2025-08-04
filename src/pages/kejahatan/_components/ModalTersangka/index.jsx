import Form from "../../../../components/HooksForm/Form";
import Textarea from "../../../../components/HooksForm/TextArea";
import Input from "../../../../components/HooksForm/Input";
import SelectField from "../../../../components/HooksForm/Select";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import usePutData from "../../hooks-integration/usePutData";

const ModalTersangka = ({ data, isOwnAction, onClose }) => {
    const { id } = useParams();
    const { postData: PostUpdate, } = usePutData({ id });
    const defaultValues = {
        detail_tersangka: data?.data?.content?.tersangka?.detail_tersangka ?? "",
        kewarganegaraan: data?.data?.content?.tersangka?.kewarganegaraan ?? "",
        jenis_kelamin: data?.data?.content?.tersangka?.jenis_kelamin ?? "",
        umur: data?.data?.content?.tersangka?.umur ?? ""
    };
    const handleSubmit = (value) => {
        const body = {
            "no_laporan": data?.data?.content?.no_laporan,
            "tanggal_laporan": data?.data?.content?.tanggal_laporan,
            "tanggal_pidana": data?.data?.content?.tanggal_pidana,
            "singkat_kejadian": data?.data?.content?.singkat_kejadian,
            "taksiran_kerugian": data?.data?.content?.taksiran_kerugian,
            "detail_pelapor": data?.data?.content?.detail_pelapor,
            "tersangka": value
        }
        PostUpdate(body);
        setTimeout(() => {
            isOwnAction();
            onClose();
        }, 500)
    }
    return (
        <Form onSubmit={handleSubmit} defaultValues={defaultValues}>
            <div className="pt-4 flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">
                    Nama, Tempat Lahir, Agama, Pekerjaan & Tempat Tinggal
                </label>
                <Textarea rows={6} validation={["required"]} name="detail_tersangka" className="text-sm px-3" placeholder="Detail Tersangka..." />
                <label className="text-sm font-medium text-gray-600">Kewarganegaraan</label>
                <SelectField
                    validation={["required"]}
                    name="kewarganegaraan"
                    className="text-sm px-3"
                    placeholder="Pilih kewarganegaraan"
                    options={[
                        { label: "WNI", value: "wni" },
                        { label: "WNA", value: "wna" },
                    ]}
                />

                <label className="text-sm font-medium text-gray-600">Jenis Kelamin</label>
                <SelectField
                    validation={["required"]}
                    name="jenis_kelamin"
                    className="text-sm px-3"
                    placeholder="Pilih jenis kelamin"
                    options={[
                        { label: "Laki-Laki", value: "laki-laki" },
                        { label: "Perempuan", value: "perempuan" },
                    ]}
                />

                <label className="text-sm font-medium text-gray-600">Umur</label>
                <Input
                    validation={["required"]}
                    name="umur"
                    className="text-sm px-3"
                    placeholder="Umur..."
                />
            </div>

            <div className="py-4">
                <button
                    type="submit"
                    className="p-2 px-2 bg-green-600 flex items-center gap-1 cursor-pointer rounded-md text-sm text-white hover:bg-green-700"
                >
                    <ArrowRightIcon className="h-5" />
                    <span>Tambah</span>
                </button>
            </div>
        </Form>
    );
};

export default ModalTersangka;
