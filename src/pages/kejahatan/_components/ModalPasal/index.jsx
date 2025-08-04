import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Form from "../../../../components/HooksForm/Form";
import Input from "../../../../components/HooksForm/Input";
import { useParams } from "react-router-dom";
import usePutData from "../../hooks-integration/usePutData";

const ModalPasalPerkara = ({ data, isOwnAction, onClose }) => {
    const { id } = useParams();
    const { postData: PostUpdate, } = usePutData({ id });

    const defaultValues = {
        kejahatan: data?.data?.content?.pasal?.kejahatan ?? "",
        bebas: data?.data?.content?.pasal?.bebas ?? "",
    };
    const handleSubmit = (value) => {
        const body = {
            "no_laporan": data?.data?.content?.no_laporan,
            "tanggal_laporan": data?.data?.content?.tanggal_laporan,
            "tanggal_pidana": data?.data?.content?.tanggal_pidana,
            "singkat_kejadian": data?.data?.content?.singkat_kejadian,
            "taksiran_kerugian": data?.data?.content?.taksiran_kerugian,
            "detail_pelapor": data?.data?.content?.detail_pelapor,
            "pasal": value
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
                <div className="grid gap-3 flex-1">
                    <label className="text-sm mb-2 font-semibold leading-0 flex flex-col gap-2 text-gray-800">Kejahatan</label>
                    <Input
                        name={'kejahatan'}
                        placeholder="Kejahatan"
                        validation={["required"]}
                        className="text-sm px-3 w-full"
                    />
                </div>

                <div className="grid gap-3 flex-1">
                    <label className="text-sm mb-2 font-semibold leading-0 flex flex-col gap-2 text-gray-800">Bebas</label>
                    <Input
                        name={'bebas'}
                        placeholder="Bebas"
                        validation={["required"]}
                        className="text-sm px-3 w-full"
                    />
                </div>
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

export default ModalPasalPerkara;
