export default function GeoLocationError({ error }) {
    return (
        <>
            <div>
                <h5>Current location didn't found!</h5> 
                <h2>Please, use search for current weather info.</h2>
            </div>
            <div>*{error}</div>
        </>
    );
}