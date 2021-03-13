import React, { useEffect } from "react";

import { Modal, Header, Button, Table } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontSize: "13px",
  },
  modalTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
      textAlign: "center",
    },
  },
}));

const style = {
  tr: {
    width: 20,
  },
};

export default function PredictionsModal(props) {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classes.title}
    >
      <Modal.Header closeButton className={classes.title}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.title}>
        <div className={classes.modalTitle}>
          <img src={props.match.localTeam.data.logo_path} width="60" />{" "}
          {props.match.localTeam.data.name} vs{" "}
          {props.match.visitorTeam.data.name}{" "}
          <img src={props.match.visitorTeam.data.logo_path} width="60" />
        </div>
        <h4>Chance for odds.</h4>
        <Table responsive>
          <thead>
            <th>{props.match.localTeam.data.name}</th>
            <th>{props.match.visitorTeam.data.name}</th>
            <th>Uafgjort</th>
            <th>Begge hold scorer</th>
            <th>Over 2,5 mål</th>
            <th>Under 2,5 mål</th>
            <th>Over 3,5 mål</th>
            <th>Under 3,5 mål</th>
          </thead>
          <tbody>
            <th>
              {props.match.probability.data.predictions.home
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.away
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.draw
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.btts
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.over_2_5
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.under_2_5
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.over_3_5
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
            <th>
              {props.match.probability.data.predictions.under_3_5
                .toString()
                .substring(0, 5)}{" "}
              %
            </th>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.match.onHide}>Luk</Button>
      </Modal.Footer>
    </Modal>
  );
}
