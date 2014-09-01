e="System.Int32" />
            <CmdletOutputMetadata>
              <ErrorCode />
            </CmdletOutputMetadata>
          </ReturnValue>
          <Parameters>
            <Parameter ParameterName="InputObject">
              <Type PSType="Microsoft.Management.Infrastructure.CimInstance" ETSType="Microsoft.Management.Infrastructure.CimInstance#MSFT_ScheduledTask" />
              <CmdletParameterMetadata IsMandatory="true" Position="1" ValueFromPipeline="true">
                <ValidateNotNull />
                <ValidateNotNullOrEmpty />
              </CmdletParameterMetadata>
            </Parameter>
          </Parameters>
        </Method>
        <Method MethodName="StartByPath" CmdletParameterSet="Path">
          <ReturnValue>
            <Type PSType="System.Int32" />
            <CmdletOutputMetadata>
              <ErrorCode />
            </CmdletOutputMetadata>
          </ReturnValue>
          <Parameters>
            <Parameter ParameterName="TaskPath">
              <Type PSType="System.String" />
              <CmdletParameterMetadata Position="1">
                <ValidateNotNull />
                <ValidateNotNullOrEmpty />
              </CmdletParameterMetadata>
            </Parameter>
            <Parameter ParameterName="TaskName">
              <Type PSType="System.String" />
              <CmdletParameterMetadata IsMandatory="true" Position="0">
                <ValidateNotNull />
                <ValidateNotNullOrEmpty />
              </CmdletParameterMetadata>
            </Parameter>
          </Parameters>
        </Method>
      </Cmdlet>
      <Cmdlet>
        <CmdletMetadata Verb="Stop" DefaultCmdletParameterSet="Path" />
        <Method MethodName="StopByObject" CmdletParameterSet="Object">
          <ReturnValue>
            <Type PSType="System.Int32" />
            <CmdletOutput