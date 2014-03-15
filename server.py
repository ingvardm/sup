#!/usr/bin/env python

import os

import pickledb
from gevent import monkey; monkey.patch_all()
from bottle import jinja2_template as template
from bottle import run, get, post, static_file, request, abort

config = dict(
    debug=True,
    allowed_static=(".css", ".js", ".png"),
    places_db="data/places.json",
    result_db="data/metrics.json")


def create_db():
    db = pickledb.load(config.get("result_db"), False)
    db.lcreate("visits")
    db.dump()


def write_data(data):
    db = pickledb.load(config.get("result_db"), False)
    db.ladd("visits", data)
    db.dump()


@get("/static/<path:path>")
def static(path):
    if os.path.splitext(path)[1] in config.get("allowed_static"):
        return static_file(path, root="public")
    else:
        # No Content
        abort(204)


@post("/metrics")
def postmetrics():
    if "application/json" in request.headers.get("Content-Type"):
        write_data(request.json)
    else:
        # Refuse request
        abort(403)


@get("/")
def index():
    db = pickledb.load(config.get("places_db"), False)
    places = db.get("places")
    return template("index", places=places)


if __name__ == '__main__':
    if not os.path.exists(config.get("result_db")):
        # First run ?
        create_db()

    run(host="0.0.0.0",
        port=8000,
        server="gevent",
        debug=config.get("debug"),
        reloader=config.get("debug"))
