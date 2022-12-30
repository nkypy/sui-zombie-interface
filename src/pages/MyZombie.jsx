import '../static/ZombiePreview.css';
import { useOutletContext } from 'react-router-dom';
import { Grid, Card, Image, Input, Pagination, Loading, Popover, useToasts, useInput } from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import tester_bg from '../static/tester-bg@2x.png';


export const MyZombie = () => {
    const [wallet, provider] = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [zombies, setZombies] = useState([]);

    const { setToast } = useToasts()
    const { state, setState, reset, bindings } = useInput('')

    const fetchZombies = async () => {
        await wallet.getAccounts().then(async (acc) => {
            await provider.getObjectsOwnedByAddress(
                acc[0]
            ).then(async (resp) => {
                const ids = []
                resp.map((obj) => {
                    if (obj.type == "0x4748720a6c6c5300e41b359647a935c1772a998e::zombiev1::Zombie") {
                        ids.push(obj.objectId);
                    }
                })
                await provider.getObjectBatch(ids)
                    .then((response) => {
                        response.filter(e => e.status == "Exists")
                        setZombies(response)
                    })
                    .catch((err) => {
                        setToast({
                            text: err,
                            type: 'error',
                        })
                    })
            }).catch((err) => {
                setToast({
                    text: err,
                    type: 'error',
                })
            })
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
        fetchZombies();
    }, [provider])

    const createZombieHandler = async () => {
        await wallet.signAndExecuteTransaction({
            kind: "moveCall",
            data: {
                packageObjectId: "0x4748720a6c6c5300e41b359647a935c1772a998e",
                module: "zombiev1",
                function: "create_zombie_and_keep",
                typeArguments: [],
                arguments: [
                    state.split('').map(c => c.charCodeAt(0)),
                ],
                gasBudget: 10000,
            }
        }).then(async (response) => {
            setToast({
                text: '成功购买僵尸',
                type: 'success',
            })
            setLoading(true)
            await fetchZombies()
        }).catch((err) => {
            setToast({
                text: err,
                type: 'error',
            })
        })
    };

    return (
        <Grid.Container gap={2} justify="center">
            {loading ? (
                <Grid xs={16}>
                    <Loading type="success" spaceRatio={2.5}>加载中</Loading>
                </Grid>) : (
                <Grid xs={16}>
                    {zombies.length ? (
                        <Grid.Container justify='flex-start'>
                            <Grid xs={24}>
                                <Grid.Container gap={1} justify="flex-start">
                                    {zombies.map((obj) => (
                                        <Grid key={obj.details.data.fields.id.id} xs={6}>
                                            <Card width="200px" className="zombie-grid-card">
                                                <Popover trigger="hover" placement='right' content={() => (<><div>Name: {obj.details.data.fields.name}</div><div>DNA: {obj.details.data.fields.dna}</div></>)}>
                                                    <Link to={"/zombie/" + obj.details.data.fields.id.id}>
                                                        <Image src={tester_bg} width="200px" draggable={false} />
                                                    </Link>
                                                </Popover>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </Grid>
                            <Grid xs={24}>
                                {zombies.length > 8 &&
                                    <Grid.Container gap={1} justify="center">
                                        <Grid sx={4}>
                                            <Pagination count={zombies.length / 8} initialPage={1} limit={5}>
                                                <Pagination.Next><ChevronRightCircle /></Pagination.Next>
                                                <Pagination.Previous><ChevronLeftCircle /></Pagination.Previous>
                                            </Pagination>
                                        </Grid>
                                    </Grid.Container>
                                }
                            </Grid>
                            <div>{wallet.account}</div>
                        </Grid.Container>

                    ) : <></>}
                </Grid>
            )}
            <Grid xs={8}>
                {wallet.connected &&
                    <div className='buyArea'>
                        <div className='zombieInput'>
                            <Input {...bindings} id='zombieName' placeholder='给僵尸起个好名字' width="100%" />
                        </div>
                        <div>
                            <button className="attack-btn" onClick={createZombieHandler}>
                                <span>
                                    购买僵尸
                                </span>
                            </button>
                        </div>
                    </div>
                }
            </Grid>
        </Grid.Container>
    )
};