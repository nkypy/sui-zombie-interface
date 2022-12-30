import { Link } from "react-router-dom";
import { Grid, Card, Image, Button } from '@geist-ui/core'

import not_found from '../static/not_found.png'

export const NotFound = () => {
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={12}>
                <Card className="zombie-grid-card">
                    <Image src={not_found} />
                    <Grid.Container gap={2} justify="center">
                        <Grid xs={8}>
                            <Link to="/">
                                <Button type="success">返回首页</Button>
                            </Link>
                        </Grid>
                    </Grid.Container>

                </Card>
            </Grid>
        </Grid.Container>
    );
};
