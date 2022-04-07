import CreateReservation from "../components/reservation/CreateReservation"
import Container from '@material-ui/core/Container'

const BookingView = () => {
    return (
        <Container className="mt-5">
            <CreateReservation />
        </Container>
    )
}
export default BookingView;