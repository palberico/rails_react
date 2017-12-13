class Api::SongsController < ApplicationController
    def index
        @songs = Song.all
        render json: @songs
    end

    def create
        song = Song.create(song_params)
        render json: song
    end

    def destroy
    end

    private

    def song_params
        params.require(:song).permit(:title, :artist)
    end
end

