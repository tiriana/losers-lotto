declare module GAME.PLUGINS {
    import Button = DUST.COMPONENT.Button;
    import Text = DUST.COMPONENT.Text;
    class SoundScreenLabel extends Text {
        constructor();
    }
    class SoundScreenButtonOn extends Button {
        constructor();
    }
    class SoundScreenButtonOff extends Button {
        constructor();
    }
    function soundScreen(): any;
}
