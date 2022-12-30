import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Grid, Card, Image, Text, Pagination, Popover, Loading, useToasts } from "@geist-ui/core";
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import tester_bg from '../static/tester-bg@2x.png';

export const Home = () => {
    const [wallet, provider] = useOutletContext();

    const [loading, setLoading] = useState(true);

    const [zombies, setZombies] = useState([]);

    const { setToast } = useToasts()


    const fetchZombies = async () => {
        await provider.getEvents(
            { MoveEvent: "0x4748720a6c6c5300e41b359647a935c1772a998e::zombiev1::ZombieCreated" },
            null,
            12,
            false,
        ).then(async (resp) => {
            const ids = []
            resp.data.map((obj) => {
                ids.push(obj.event.moveEvent.fields.id);
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
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchZombies();
    }, [provider])

    return (
        <Grid.Container justify="center">
            {loading ? (
                <Grid xs={24}>
                    <Loading type="success" spaceRatio={2.5}>加载中</Loading>
                </Grid>) : (
                <Grid xs={24}>
                    {zombies.length ? (
                        <Grid.Container justify="center">
                            <Grid xs={24}>
                                <Grid.Container gap={1} justify="flex-start">
                                    {zombies.map((obj) => (
                                        <Grid key={obj.details.data.fields.id.id} xs={4}>
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
                                {zombies.length > 12 &&
                                    <Grid.Container gap={1} justify="center">
                                        <Grid sx={4}>
                                            <Pagination count={zombies.length / 12} initialPage={1} limit={5}>
                                                <Pagination.Next><ChevronRightCircle /></Pagination.Next>
                                                <Pagination.Previous><ChevronLeftCircle /></Pagination.Previous>
                                            </Pagination>
                                        </Grid>
                                    </Grid.Container>
                                }
                            </Grid>
                        </Grid.Container>
                    ) : <></>
                    }
                </Grid>
            )}
        </Grid.Container>
    );
};
