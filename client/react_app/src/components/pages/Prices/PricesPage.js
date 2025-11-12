import { Alert, Container } from 'reactstrap';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConcerts, loadConcertsRequest } from '../../../redux/concertsRedux';

const Prices = () => {
    const dispatch = useDispatch();
    const concerts = useSelector(getConcerts);

    useEffect(() => {
        dispatch(loadConcertsRequest());
    }, [dispatch]);

  const dayOne = concerts.filter(concert => concert.day === 1);
  const dayTwo = concerts.filter(concert => concert.day === 2);
  const dayThree = concerts.filter(concert => concert.day === 3);
    
  return(
  <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>

    <h2>Day one</h2>
    <p>Price: 25$</p>
    { dayOne && dayOne.length > 0 && <p>Performers: {dayOne.map(concert => `${concert.performer}, `)}</p>}
    <p>Workshops: "Rock Music Style", "How to make you voice grooowl", "Make your voice stronger", "History of Rock"</p>
    <h2>Day Two</h2>
    <p>Price: 25$</p>
    { dayTwo && dayTwo.length > 0 && <p>Performers: {dayTwo.map(concert => `${concert.performer}, `)}</p>}
    <p>Workshops: "Find your real tune", "Find your real YOU", "Fell the music", "Jam session"</p>
    <h2>Day three</h2>
    <p>Price: 50$</p>
    { dayThree && dayThree.length > 0 && <p>Performers: {dayThree.map(concert => `${concert.performer}, `)}</p>}
    <p>Workshops: "Increase your vocal range", "How to properly warmup before singing", "It's time for YOU!"</p>

  </Container>
)};

export default Prices;