/* eslint-disable import/no-nodejs-modules */
import path from 'path';
import express from 'express';
import React from 'react';
import {renderToHtml, StyledComponentsServerRenderer} from '@isoreact/core';

import IsoClock from '../components/clock/iso';
import IsoComponent2 from '../components/component2/iso';

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, '../../dist')));

app.get('/', async (req, res) => {
    const [component1Html, component2Html, component3Html] = await Promise.all([
        renderToHtml(<IsoClock startFromSeconds={60} />, {serverRenderer: StyledComponentsServerRenderer}),
        renderToHtml(<IsoClock />, {serverRenderer: StyledComponentsServerRenderer}),
        renderToHtml(<IsoComponent2 />, {serverRenderer: StyledComponentsServerRenderer}),
    ]);

    res.locals = {
        component1Html,
        component1Src: '<IsoClock startFromSeconds={60} />',
        component2Html,
        component2Src: '<IsoClock />',
        component3Html,
        component3Src: '<IsoComponent2 />',
    };

    res.render('index');
});

app.listen(3000, () => {
    console.info('Server listening on port 3000'); // eslint-disable-line no-console
});
