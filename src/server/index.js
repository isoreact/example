/* eslint-disable import/no-nodejs-modules */
import path from 'path';
import express from 'express';
import React from 'react';
import {renderToHtml, StyledComponentsServerRenderer} from '@isoreact/core';

import IsoClock from '../components/clock/iso';
import IsoClockNow from '../components/clock-now/iso';
import IsoComponent2 from '../components/component2/iso';

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, '../../dist')));

app.get('/', async (req, res) => {
    const renderer = new StyledComponentsServerRenderer();
    const [
        isoClockHtml,
        isoClock2Html,
        isoClockNowHtml,
        isoComponent2Html,
    ] = await Promise.all([
        renderToHtml(<IsoClock start={{hours: 0, minutes: 1, seconds: 0}} />, {render: renderer.render}),
        renderToHtml(<IsoClock />, {render: renderer.render}),
        renderToHtml(<IsoClockNow />, {render: renderer.render}),
        renderToHtml(<IsoComponent2 />, {render: renderer.render}),
    ]);

    res.locals = {
        head: renderer.sheet.getStyleTags(),
        isoClockHtml,
        isoClockSrc: '<IsoClock start={{hours: 0, minutes: 1, seconds: 0}} />',
        isoClock2Html,
        isoClock2Src: '<IsoClock />',
        isoClockNowHtml,
        isoClockNowSrc: '<IsoClockNow />',
        isoClockNowBrowserOnlySrc: '<IsoClockNow />',
        isoComponent2Html,
        isoComponent2Src: '<IsoComponent2 />',
    };

    res.render('index');
});

app.get('/api/v1/time', (req, res) => {
    setTimeout(() => {
        const now = new Date();

        res.send({
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        });
    }, 500);
});

app.listen(3000, () => {
    console.info('Server listening on port 3000'); // eslint-disable-line no-console
});
