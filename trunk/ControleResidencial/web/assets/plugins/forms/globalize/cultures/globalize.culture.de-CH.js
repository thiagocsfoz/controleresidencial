 ETSType="Microsoft.Management.Infrastructure.CimInstance#MSFT_StoragePool" />
              <CmdletParameterMetadata PSName="StoragePool" ValueFromPipeline="true" CmdletParameterSets="ByStoragePool" ErrorOnNoMatch="false" />
            </AssociatedInstance>
          </Association>
          <!-- VirtualDisk -->
          <Association Association="MSFT_VirtualDiskToPhysicalDisk" SourceRole="VirtualDisk" ResultRole="PhysicalDisk">
            <AssociatedInstance>
              <Type PSType="Microsoft.Management.Infrastructure.CimInstance" ETSType="Microsoft.Management.Infrastructure.CimInstance#MSFT_VirtualDisk" />
              <CmdletParameterMetadata PSName="VirtualDisk" ValueFromPipeline="true" CmdletParameterSets="ByVirtualDisk" ErrorOnNoMatch="false" />
            </AssociatedInstance>
          </Association>
        </QueryableAssociations>
        <QueryOptions>
          <Option OptionName="VirtualRangeMin">
            <Type PSType="System.UInt64" />
            <CmdletParameterMetadata PSName="VirtualRangeMin" CmdletParameterSets="ByVirtualDisk" />
          </Option>
          <Option OptionName="VirtualRangeMax">
            <Type PSType="System.UInt64" />
            <CmdletParameterMetadata PSName="VirtualRangeMax" CmdletParameterSets="ByVirtualDisk" />
          </Option>
          <Option OptionName="HasAllocations">
            <Type PSType="System.Boolean" />
            <CmdletParameterMetadata PSName="HasAllocations" CmdletParameterSets="ByVirtualDisk" />
          </Option>
          <Option OptionName="SelectedForUse">
            <Type PSType="System.Boolean" />
            <CmdletParameterMetadata PSName="SelectedForUse" CmdletParameterSets="ByVirtualDisk" />
          </Option>
        </QueryOptions>
      </GetCmdletParameters>
      <!--

        //
        // Enab