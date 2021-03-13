import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Button,
  Grid,
  CardActions,
  CardMedia,
  CardActionArea,
  Typography,
} from "@material-ui/core";

import PredictionsModal from "./PredictionsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "250px",
    margin: "30px",
    height: "320px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
      height: "320px",
    },
  },
}));

export default function MatchBox({ match }) {
  const [modalShow, setModalShow] = useState(false);

  const classes = useStyles();

  var todayDate = new Date();
  var today =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(todayDate.getDate()).padStart(2, "0");

  return (
    <div>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="div">
                {today == match.time.starting_at.date ? (
                  <h5>Spilles idag!</h5>
                ) : (
                  <h5>Snart!</h5>
                )}
              </Typography>
              <Typography variant="h5" component="h2">
                <div>
                  <img src={match.localTeam.data.logo_path} width="75" />
                  <span> </span>
                  <img src={match.visitorTeam.data.logo_path} width="75" />
                </div>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                <div>
                  <h3>
                    {match.localTeam.data.name.split(" ")[0]} <div>vs.</div>
                    {match.visitorTeam.data.name.split(" ")[0]}
                  </h3>
                </div>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                <div className={classes.title} color="textSecondary">
                  Kickoff: {match.time.starting_at.time}
                </div>
                <div className={classes.title} color="textSecondary">
                  Dato: {match.time.starting_at.date}
                </div>
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button onClick={() => setModalShow(true)}>Se stats</Button>
          <PredictionsModal
            show={modalShow}
            match={match}
            onHide={() => setModalShow(false)}
          />
        </Card>
      </Grid>
    </div>
  );
}
