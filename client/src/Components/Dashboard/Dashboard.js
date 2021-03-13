import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchBox from "../../Components/MatchBox/MatchBox";
import { makeStyles, Grid } from "@material-ui/core";
import { Button } from "react-bootstrap";

import PredictionsModal from "../../Components/MatchBox/PredictionsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Dashboard({ today, nextWeek }) {
  const classes = useStyles();
  // state til at holde øje med om modal skal vises eller ej
  const [modalShow, setModalShow] = useState(false);

  const [match, setMatch] = useState({});

  const [matches, setMatches] = useState([]);
  const [fixtures, setFixtures] = useState([]);

  let tempArrayMatches = [];
  let tempMatchObject = {};

  const api_token = process.env.REACT_APP_APITOKEN;

  useEffect(() => {
    const localStorageAllFixtures = JSON.parse(
      localStorage.getItem("allFixtures")
    );
    if (localStorageAllFixtures) {
      console.log("Hentede informationer fra localstorage");
      setMatches(localStorageAllFixtures);
    } else {
      console.log("En af listerne var tomme, henter igen.");
      fetchFixtures();
    }
  }, []);

  const fetchFixtures = async () => {
    await axios
      .get("http://localhost:5000/api/fixtures/all")
      .then((response) => {
        localStorage.setItem("allFixtures", JSON.stringify(response.data.data));
        setMatches(response.data.data);
        console.log(response.data.data);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {matches.map((match, index) => {
          if (match.id) {
            return <MatchBox key={match.id} match={match} />;
          }
        })}
      </Grid>
    </div>
  );
}
