import { CCard, CCardBody, CCardText, CCardTitle } from "@coreui/react";

function DealerCard(props) {
  const dealerCardName = props.dealerCardName;
  return (
    <CCard style={{ width: "7rem", height: "10rem", marginLeft: "1rem" }}>
      <CCardBody>
        <CCardTitle>{props.gameEnd ? dealerCardName : "?"}</CCardTitle>

        <CCardText></CCardText>
      </CCardBody>
    </CCard>
  );
}
export default DealerCard;
