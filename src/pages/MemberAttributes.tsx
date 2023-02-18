import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function MemberAttributes() {
    // const [legalAge, setLegalAge] = useState(false);
    // const [legalAgeValid, setLegalAgeValid] = useState(false);
    // const [driversLicense, setDriversLicense] = useState(false);
    // const [driversLicenseValid, setDriversLicenseValid] = useState(false);
    // const [firstAid, setFirstAid] = useState(false);
    // const [firstAidValid, setFirstAidValid] = useState(false);
    const [legalAge, setLegalAge] = useState(false);
    const [legalAgeValid, setLegalAgeValid] = useState(false);

    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        void legalAge;
        void legalAgeValid;
    };


    const handleLegalAge = (value:boolean) => {
        console.log("handleLegalAge")
        console.log(value)
        setLegalAge(value);
        setLegalAgeValid(true);
    };

    // const handleDriversLicense = (value:boolean) => {
    //     setDriversLicense(value);
    //     setDriversLicenseValid(true);
    // };

    // const handleFirstAid = (value:boolean) => {
    //     setFirstAid(value);
    //     setFirstAidValid(true);
    // };

    return (
        <Container>
            <h3>Før du kan tage nogle vagter skal du udfylde følgende.</h3>
            <br></br>
            <Form className="form" onSubmit={handleSubmit}>
                <FormGroup
                    row
                    tag="fieldset"
                >
                    <legend className="col-form-label col-sm-2">
                        Alder
                    </legend>
                    <Col sm={10}>
                        <FormGroup check>
                            <Input
                                name="radio1"
                                type="radio"
                                onClick={() => handleLegalAge(true)}
                            />
                            <Label check>
                            Jeg er fyldt 23 år inden min første vagt
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                name="radio1"
                                type="radio"
                                onClick={() => handleLegalAge(false)}
                            />
                            <Label check>
                            Jeg når ikke at fylde 23 inden min første vagt
                            </Label>
                        </FormGroup>

                    </Col>
                </FormGroup>
                
                <br></br>
                

                <FormGroup
                    row
                    tag="fieldset"
                >
                    <legend className="col-form-label col-sm-2">
                        Kørekort
                    </legend>
                    <Col sm={10}>
                        <FormGroup check>
                            <Input
                                name="radio2"
                                type="radio"
                            />
                            <Label check>
                            Jeg har kørekort til almindelig bil (Kategori B).
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                name="radio2"
                                type="radio"
                            />
                            <Label check>
                            Jeg har ikke kørekort til bil.
                            </Label>
                        </FormGroup>

                    </Col>
                </FormGroup>
                
                <br></br>
                
                <FormGroup
                    row
                    tag="fieldset"
                >
                    <legend className="col-form-label col-sm-2">
                        Førstehjælp
                    </legend>
                    <Col sm={10}>
                        <FormGroup check>
                            <Input
                                name="radio3"
                                type="radio"
                            />
                            <Label check>
                            Jeg har taget Førstehjælpskursus indenfor de sidste 3 år.
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                name="radio3"
                                type="radio"
                            />
                            <Label check>
                            Jeg har ikke et gyldigt Førstehjælpskursus.
                            </Label>
                        </FormGroup>

                    </Col>
                </FormGroup>


                <FormGroup check row>
                    <Col
                        sm={{
                            offset: 2,
                            size: 10
                        }}
                    >
                        <Button color="success">
                            Bekræft
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </Container>
    );
}