import React from 'react';

const AboutUs = () => {

    // async function getCities(D: any) {
    //     const citiesCol = collection(D, 'brands');
    //     const citySnapshot = await getDocs(citiesCol);
    //     const cityList = citySnapshot.docs.map(doc => doc.data());
    //     return cityList;
    // }
    //
    // useEffect(() => {
    //     getCities(DB)
    //         .then(data => console.log(data))
    //         .catch()
    // }, []);

    // DB.ref('https://productdb-9f689-default-rtdb.europe-west1.firebasedatabase.app/').on('value', (snapshot) => {
    //     console.log(snapshot.val())
    // })


    return (
        <div  style={{margin: '0 auto'}}>
            <h1>About Us</h1>
        </div>
    );
};

export default AboutUs;