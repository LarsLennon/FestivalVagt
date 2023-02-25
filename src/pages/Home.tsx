import { Container } from "reactstrap";

export default function Home() {


    // const LogSomething = () => {
    //     console.log("LogSomething");
    // };


    return (
        <Container>
            <h1>Velkommen til Smukvagt</h1>
            <iframe title="Video Guide" width="560" height="315" src="https://www.youtube.com/embed/JO0wRjemHlg" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

            <h2>Spørgsmål og Svar</h2>
            <br />

            <h4>Kan jeg tage vagter før, under og efter festivallen?</h4>
            <p>Ja, du kan frit vælge hvilke vagter du vil tage hvis du kan vælge dem i kalenderen.</p>
            <br />
            <h4>Hvorfor er der nogle tomme vagter?</h4>
            <p>Du har enten for mange timer eller mangler kørekort samt at være over 23 for at kunne tage de vagter.</p>
            <br />
            <h4>Hvorfor kan jeg ikke vælge flere end 42 timer?</h4>
            <p>Vi sætter pris på din arbejdsglæde, men der skal være vagter nok til alle.</p>
            <br />
            <h4>Jeg fandt ikke svar på mit spørgsmål?</h4>
            <p>Så send en mail til <a href="mailto:WalthersVoV@Gmail.com">WalthersVoV@Gmail.com</a>.</p>
        </Container>
    );
}