import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useToasts } from '@geist-ui/core'

export const ZombiePreview = () => {
    const [wallet, provider] = useOutletContext();
    let { id } = useParams();

    const navigate = useNavigate();

    const { setToast } = useToasts()

    const [loading, setLoading] = useState(true);
    const [zombie, setZombie] = useState();

    const fetchZombie = async () => {
        await provider.getObject(id)
            .then((response) => {
                console.log(response)
                if (response.status == "Exists") {
                    setZombie(response);
                } else {
                    navigate("/404")
                }
            }).catch((err) => {
                setToast({
                    text: err,
                    type: 'error',
                })
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchZombie();
    }, [provider])

    return (
        <>
            <div>This is the {id} Page</div>
            {zombie && <>
                <div>ID: {id}</div>
                <div>Name: {zombie.details.data.fields.name}</div>
                <div>DNA: {zombie.details.data.fields.dna}</div>
                <div>Level: {zombie.details.data.fields.level}</div>
                <div>Owner: {zombie.details.owner.AddressOwner}</div>
            </>}
        </>
    );
};