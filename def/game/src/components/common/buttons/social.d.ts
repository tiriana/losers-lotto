declare module GAME.COMPONENTS.COMMON.BUTTONS {
    import Entity = DUST.GRAPHIC.Entity;
    import EntityOptions = DUST.GRAPHIC.EntityOptions;
    import Button = DUST.COMPONENT.Button;
    import EntityButtonOptions = DUST.COMPONENT.EntityButtonOptions;
    var events: any;
    var socialButtonsConfig: {
        moreGames: EntityButtonOptions;
    };
    class SocialButtons {
        buttons: any;
        container: Entity;
        constructor(containerOptions?: EntityOptions, buttonsCfg?: any);
        createContainer(containerOptions?: EntityOptions): Entity;
        getDefaultContainerOptions(): EntityOptions;
        createSocialButton(buttonOptions: EntityButtonOptions, name: any): Button;
    }
    function social(): any;
}
