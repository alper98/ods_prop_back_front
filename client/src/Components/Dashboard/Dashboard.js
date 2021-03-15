import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchBox from "../../Components/MatchBox/MatchBox";
import { makeStyles, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    const { data } = await axios.get("http://localhost:5000/api/fixtures/all");
    console.log(data);

    setMatches(data.data.data);
  };

  return (
    <div className={classes.root}>
      <button>Live</button>
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
