package com.mygdx.game.sprites;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.math.Vector2;

public class Starship extends Sprite {
    Vector2 previosPosition;
    public Starship (Texture texture) {
        super(texture);
        previosPosition = new Vector2(getX(), getY());
    }

    public boolean hasMoved () {
        if (previosPosition.x != getX() || previosPosition.y != getY()) {
            previosPosition.x = getX();
            previosPosition.y = getY();
            return true;
        } else {
            return false;
        }
    }
}
