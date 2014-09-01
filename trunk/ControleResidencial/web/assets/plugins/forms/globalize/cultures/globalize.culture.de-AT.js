<PowerShellMetadata xmlns="http://schemas.microsoft.com/cmdlets-over-objects/2009/11">
  <Class ClassName="ROOT/Microsoft/Windows/Storage/MSFT_ResiliencySetting">
    <Version>1.0.0.0</Version>
    <DefaultNoun>ResiliencySetting</DefaultNoun>
    <InstanceCmdlets>
      <!--

      //
      // Get-ResiliencySetting
      //

      -->
      <GetCmdletParameters DefaultCmdletParameterSet="ByName">
        <QueryableProperties>
          <!-- UniqueId -->
          <Property PropertyName="UniqueId">
            <Type PSType="System.String" />
            <RegularQuery>
              <CmdletParameterMetadata ValueFromPipelineByPropertyName="true" CmdletParameterSets="ByUniqueId" Aliases="Id" />
            </RegularQuery>
          </Property>
          <!-- Name -->
          <Property PropertyName="Name">
            <Type PSType="System.String" />
            <RegularQuery>
              <CmdletParameterMetadata CmdletParameterSets="ByName" />
            </RegularQuery>
          </Property>
         </QueryableProperties>
        <QueryableAssociations>
          <!-- StoragePool -->
          <Association Association="MSFT_StoragePoolToResiliencySetting" SourceRole="StoragePool" ResultRole="ResiliencySetting">
            <AssociatedInstance>
              <Type PSType="Microsoft.Management.Infrastructure.CimInstance" ETSType="Microsoft.Management.Infrastructure.CimInstance#MSFT_StoragePool" />
              <CmdletParameterMetadata PSName="StoragePool" ValueFromPipeline="true" CmdletParameterSets="ByName" ErrorOnNoMatch="false" />
            </AssociatedInstance>
          </Association>
        </QueryableAssociations>
      </GetCmdletParameters>
      <!--

      //
      // Set-ResiliencySetting
      //

      -->
      <Cmdlet>
        <CmdletMetadata Verb="Set" />
        <Method MethodName="SetDefaults">
        